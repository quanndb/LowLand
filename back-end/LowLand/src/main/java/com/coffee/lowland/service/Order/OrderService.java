package com.coffee.lowland.service.Order;

import com.coffee.lowland.DTO.request.order.*;

import com.coffee.lowland.DTO.response.utilities.PageServiceResponse;
import com.coffee.lowland.DTO.response.order.GetOrderDetailsResponse;
import com.coffee.lowland.DTO.response.order.GetOrderResponse;
import com.coffee.lowland.DTO.response.order.GetOrdersResponse;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.OrderMapper;
import com.coffee.lowland.model.Order;
import com.coffee.lowland.JPA.repository.OrderDetailsRepository;
import com.coffee.lowland.JPA.repository.OrderRepository;
import com.coffee.lowland.JPA.repository.ProductDetailsRepository;
import com.coffee.lowland.model.ProductDetails;
import com.coffee.lowland.service.Pay.PayService;
import com.coffee.lowland.service.Product.MaterialService;
import com.coffee.lowland.service.Product.ProductService;
import com.coffee.lowland.service.Utilities.PageService;
import com.coffee.lowland.service.Utilities.RandomCodeService;
import jakarta.persistence.StoredProcedureQuery;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.payos.type.Webhook;
import vn.payos.type.WebhookData;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class OrderService {
    OrderRepository orderRepository;
    OrderDetailsRepository orderDetailsRepository;
    ProductDetailsRepository productDetailsRepository;
    ProductService productService;
    OrderMapper orderMapper;
    RandomCodeService randomCodeService;
    OrderDetailsService orderDetailsService;
    MaterialService materialService;
    PayService payService;
    PageService<GetOrdersResponse> pageService;

    @Transactional
    @PreAuthorize("@securityService" +
            ".isIncludeRoleOrOwner(#userId, 'ADMIN', 'EMPLOYEE')")
    public PageServiceResponse<GetOrdersResponse> getOrders(Integer page, Integer size, String query,
                                                            String sortedBy, String sortDirection,
                                                            Integer status, String userId) {
        StoredProcedureQuery store = pageService
                .prepareStatement("spGetOrdersByPage", GetOrdersResponse.class,
                        page, size, query, sortedBy, sortDirection);
        pageService.addField(store, "status", Integer.class, status);
        pageService.addField(store, "account_id", String.class, userId);
        return pageService.pageResponse(store);
    }

    @PreAuthorize("@securityService" +
            ".isIncludeRoleOrOwner(#accountId, 'ADMIN', 'EMPLOYEE')")
    @SuppressWarnings("unused")
    public String createOrder(String accountId, CreateOrderRequest request){
        // pre check product
        request.getItems().forEach(item->{
            ProductDetails details = productDetailsRepository
                    .findById(item.getProductDetailsId())
                    .orElseThrow(()->new AppExceptions(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));
            boolean isActiveProduct = productService.isActiveProduct(details.getProductId());
            if(!isActiveProduct) throw new AppExceptions(ErrorCode.PRODUCT_NOT_ACTIVE);
        });

        // create new order
        Order newOrder = orderMapper.toOrder(request);
        String createdUser = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        newOrder.setAccountId(accountId);
        newOrder.setOrderCode(randomCodeService.generateCode());
        newOrder.setCreatedDate(LocalDateTime.now(ZoneId.of("UTC+7")));
        newOrder.setCreatedBy(createdUser);
        Order savedOrder = orderRepository.save(newOrder);

        // Process order details
        request.getItems().forEach(item -> {
            item.setOrderId(savedOrder.getOrderId());
            ProductDetails found = productDetailsRepository.findById(item.getProductDetailsId())
                    .orElseThrow(() -> new AppExceptions(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));
            Double price = found.getSalePrice() != null && found.getSalePrice() != 0d ? found.getSalePrice() : found.getPrice();
            item.setTotalMoney(price * item.getQuantity());
            orderDetailsRepository.save(item);
        });
        return newOrder.getOrderId();
    }

    @PreAuthorize("@securityService" +
            ".isIncludeRoleOrOwner(#userId, 'ADMIN', 'EMPLOYEE')")
    @SuppressWarnings("unused")
    public String cancelOrder(String userId, String orderId, String request) throws Exception {
        Order foundOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppExceptions(ErrorCode.ORDER_NOT_EXISTED));
        if(foundOrder.getStatus()!=0){
            throw new AppExceptions(ErrorCode.RESOLVED_ORDER);
        }
        foundOrder.setNote(request);
        foundOrder.setStatus(3);
        orderRepository.save(foundOrder);
        if(foundOrder.getPaymentLink()!=null){
            payService.cancelPaymentLink(
                    CancelPaymentRequest.builder()
                            .reason(foundOrder.getNote())
                            .orderCode(foundOrder.getOrderCode())
                            .build());
        }
        return "Your order has been cancelled successfully!";
    }

    @PreAuthorize("@securityService" +
            ".isIncludeRoleOrOwner(#userId, 'ADMIN', 'EMPLOYEE')")
    @SuppressWarnings("unused")
    public Order updateOrder(String userId, String orderId, UpdateOrderRequest request){
        Order foundOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppExceptions(ErrorCode.ORDER_NOT_EXISTED));
        if(foundOrder.getStatus()!=0){
            throw new AppExceptions(ErrorCode.RESOLVED_ORDER);
        }
        orderMapper.updateOrder(foundOrder, request);
        foundOrder.setUpdatedDate(LocalDateTime.now(ZoneId.of("UTC+7")));
        foundOrder.setUpdatedBy(SecurityContextHolder.getContext().getAuthentication().getName());
        orderRepository.save(foundOrder);
        return orderRepository.save(foundOrder);
    }

    @Transactional
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public Order approveOrder(String orderId, ApproveOrderRequest request){
        Order foundOrder = orderRepository.findById(orderId)
                .orElseThrow(()->new AppExceptions(ErrorCode.ORDER_NOT_EXISTED));
        if(request.getStatus()==0 ||
                foundOrder.getStatus()==3 || foundOrder.getStatus()==2){
            throw new AppExceptions(ErrorCode.RESOLVED_ORDER);
        }
        materialService.updateQuantityMaterialAfterApproveOrder(orderId);
        orderMapper.approveOrder(foundOrder, request);
        foundOrder.setUpdatedDate(LocalDateTime.now(ZoneId.of("UTC+7")));
        foundOrder.setUpdatedBy(SecurityContextHolder.getContext().getAuthentication().getName());

        return orderRepository.save(foundOrder);
    }

    public String payResult(Webhook request) throws Exception {
        WebhookData res= payService.verifyPayment(request);

        Optional<Order> foundOrder = orderRepository.findByOrderCode(Math.toIntExact(res.getOrderCode()));

        Order order = foundOrder.orElseThrow(() -> new AppExceptions(ErrorCode.ORDER_NOT_EXISTED));
        order.setStatus(1);
        orderRepository.save(order);
        return "Payment success";
    }


    @PreAuthorize("@securityService" +
            ".isIncludeRoleOrOwner(#userId, 'ADMIN', 'EMPLOYEE')")
    @SuppressWarnings("unused")
    public GetOrderResponse getOrderDetails(String userId, String orderId) {
         Order foundOrder = orderRepository.findById(orderId)
                .orElseThrow(()->new AppExceptions(ErrorCode.ORDER_NOT_EXISTED));
        List<GetOrderDetailsResponse> items = orderDetailsService.getOrderDetailsByOrderId(foundOrder.getOrderId());
        GetOrderResponse res = GetOrderResponse.builder().items(items).build();
        orderMapper.getOrder(res, foundOrder);
        return res;
    }
}
