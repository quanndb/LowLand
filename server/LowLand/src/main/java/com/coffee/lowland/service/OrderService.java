package com.coffee.lowland.service;

import com.coffee.lowland.DTO.request.order.CancelOrderRequest;
import com.coffee.lowland.DTO.request.order.CancelPaymentRequest;
import com.coffee.lowland.DTO.request.order.CreateOrderRequest;

import com.coffee.lowland.DTO.request.order.UpdateOrderRequest;
import com.coffee.lowland.DTO.response.order.PayResponse;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.OrderMapper;
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
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

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
    PayService payService;

    public List<Order> getOrders(String searchKeyword, int pageNumber, int pageSize) {
        return orderRepository.spGetOrders(searchKeyword, pageNumber, pageSize);
    }

    public String createOrder(CreateOrderRequest request){
        Order newOrder = orderMapper.toOrder(request);
        newOrder.setOrderCode(randomCodeService.generateCode());
        newOrder.setCreatedDate(LocalDateTime.now());
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
        orderRepository.save(foundOrder);
        return "Update your order successfully!";
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

    public boolean orderExists(int orderId){
        return orderRepository.existsById(orderId);
    }

    public Object getOrder(int orderId) {
        return orderRepository.findById(orderId);
    }
}
