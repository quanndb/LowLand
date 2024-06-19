package com.coffee.lowland.service;

import com.coffee.lowland.DTO.request.order.*;

import com.coffee.lowland.DTO.response.order.GetOrderDetailsResponse;
import com.coffee.lowland.DTO.response.order.GetOrderResponse;
import com.coffee.lowland.DTO.response.order.GetOrdersResponse;
import com.coffee.lowland.DTO.response.order.PayResponse;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.OrderMapper;
import com.coffee.lowland.model.Account;
import com.coffee.lowland.model.Order;
import com.coffee.lowland.model.OrderDetails;
import com.coffee.lowland.repository.OrderDetailsRepository;
import com.coffee.lowland.repository.OrderRepository;
import com.coffee.lowland.repository.ProductDetailsRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Slf4j
public class OrderService {
    OrderRepository orderRepository;
    OrderDetailsRepository orderDetailsRepository;
    ProductDetailsRepository productDetailsRepository;
    OrderMapper orderMapper;
    RandomCodeService randomCodeService;
    OrderDetailsService orderDetailsService;
    PayService payService;
    DateService dateService;
    AccountService accountService;

    @Transactional
    public List<GetOrdersResponse> getOrders() {
        List<Object[]> orders = orderRepository.spGetAllOrders(0);
        return getOrdersMapper(orders);
    }

    @Transactional
    public List<GetOrdersResponse> getMyOrders() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Account foundAccount = accountService.findAccountByEmail(username);
        List<Object[]> orders = orderRepository.spGetAllOrders(foundAccount.getAccountId());
        return getOrdersMapper(orders);
    }

    public String createOrder(CreateOrderRequest request){
        Order newOrder = orderMapper.toOrder(request);
        newOrder.setOrderCode(randomCodeService.generateCode());
        newOrder.setCreatedDate(LocalDateTime.now());
        newOrder.setCreatedBy(SecurityContextHolder.getContext().getAuthentication().getName());
        newOrder = orderRepository.save(newOrder);
        List<OrderDetails> listOrderDetails = request.getItems();
        for(OrderDetails item : listOrderDetails){
            item.setOrderId(newOrder.getOrderId());
            float PDPrice = productDetailsRepository.findById(item.getProductDetailsId())
                            .orElseThrow(()->new AppExceptions(ErrorCode.PRODUCT_DETAIL_NOT_FOUND))
            .getPrice();
            item.setTotalMoney(PDPrice*item.getQuantity());
            orderDetailsRepository.save(item);
        }
        return "Create an order successfully!";
    }

    public String cancelOrder(CancelOrderRequest request){
        Order foundOrder = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new AppExceptions(ErrorCode.ORDER_NOT_EXISTED));
        if(foundOrder.getStatus()!=0){
            throw new AppExceptions(ErrorCode.RESOLVED_ORDER);
        }
        orderMapper.cancelOrder(foundOrder,request);
        foundOrder.setStatus(3);
        orderRepository.save(foundOrder);
        if(foundOrder.getPaymentLink()!=null){
            payService.cancelPaymentLink(
                    CancelPaymentRequest.builder()
                            .reason(foundOrder.getNote())
                            .orderCode(foundOrder.getOrderCode())
                            .build()).block();
        }
        return "Your order has been cancelled successfully!";
    }

    public String updateOrder(UpdateOrderRequest request){
        Order foundOrder = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new AppExceptions(ErrorCode.ORDER_NOT_EXISTED));
        if(foundOrder.getStatus()!=0){
            throw new AppExceptions(ErrorCode.RESOLVED_ORDER);
        }
        orderMapper.updateOrder(foundOrder, request);
        foundOrder.setUpdatedDate(LocalDateTime.now());
        foundOrder.setUpdatedBy(SecurityContextHolder.getContext().getAuthentication().getName());
        orderRepository.save(foundOrder);
        return "Update your order successfully!";
    }

    public String manageOrder(ApproveOrderRequest request){
        Order foundOrder = orderRepository.findById(request.getOrderId())
                .orElseThrow(()->new AppExceptions(ErrorCode.ORDER_NOT_EXISTED));
        if(request.getStatus()==0 ||
                request.getStatus()==1 ||
                foundOrder.getStatus()==2 ||
                foundOrder.getStatus()==3){
            throw new AppExceptions(ErrorCode.RESOLVED_ORDER);
        }
        orderMapper.approveOrder(foundOrder, request);
        foundOrder.setUpdatedDate(LocalDateTime.now());
        foundOrder.setUpdatedBy(SecurityContextHolder.getContext().getAuthentication().getName());
        orderRepository.save(foundOrder);
        return "Update order successfully!";
    }

    public String payResult(Object request) {
        Object result = Objects.requireNonNull(payService.verifyPayment(request).block()).getResult();
        PayResponse res;
        if (result instanceof LinkedHashMap) {
            ObjectMapper mapper = new ObjectMapper();
            try {
                res = mapper.convertValue(result, PayResponse.class);
            } catch (IllegalArgumentException e) {
                throw new ClassCastException("Cannot cast LinkedHashMap to PayResponse: " + e.getMessage());
            }
        } else {
            throw new ClassCastException("Cannot cast result of type " + result.getClass().getName() + " to PayResponse");
        }
        Optional<Order> foundOrder = orderRepository.findByOrderCode(res.getOrderCode());

        Order order = foundOrder.orElseThrow(() -> new AppExceptions(ErrorCode.ORDER_NOT_EXISTED));
        order.setStatus(1);
        orderRepository.save(order);
        return "Payment success";
    }

    public GetOrderResponse getOrder(int orderId) {
         Order foundOrder = orderRepository.findById(orderId)
                .orElseThrow(()->new AppExceptions(ErrorCode.ORDER_NOT_EXISTED));
        List<GetOrderDetailsResponse> items = orderDetailsService.getOrderDetailsByOrderId(foundOrder.getOrderId());
        GetOrderResponse res = GetOrderResponse.builder().items(items).build();
        orderMapper.getOrder(res, foundOrder);
        return res;
    }

    public List<GetOrdersResponse> getOrdersMapper(List<Object[]> request){
        List<GetOrdersResponse> res = new ArrayList<>();
        for(Object[] item : request){
            res.add(
                    GetOrdersResponse.builder()
                            .orderCode((Integer)item[0])
                            .customerName((String)item[1])
                            .phoneNumber((String)item[2])
                            .address((String)item[3])
                            .createdDate(dateService.toLocalDateTime(item[4].toString()))
                            .createdBy((String)item[5])
                            .productName((String)item[6])
                            .sizeName((String)item[7])
                            .quantity((Integer)item[8])
                            .price(((BigDecimal)item[9]).floatValue())
                            .totalMoney(((BigDecimal)item[10]).floatValue())
                            .imageUrl((String)item[11])
                            .status((int)item[12])
                            .build()
            );
        }
        return res;
    }
}
