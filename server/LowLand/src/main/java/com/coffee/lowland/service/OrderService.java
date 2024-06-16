package com.coffee.lowland.service;

import com.coffee.lowland.DTO.request.order.CreateOrderRequest;
import com.coffee.lowland.DTO.response.order.CreateOrderResponse;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.OrderMapper;
import com.coffee.lowland.model.Order;
import com.coffee.lowland.model.OrderDetails;
import com.coffee.lowland.repository.OrderDetailsRepository;
import com.coffee.lowland.repository.OrderRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Slf4j
public class OrderService {
    OrderRepository orderRepository;
    OrderDetailsRepository orderDetailsRepository;
    OrderMapper orderMapper;

    public Order getCurrentOrder(int id){
        return orderRepository.findById(id).orElseThrow(
                ()->  new AppExceptions(ErrorCode.ORDER_NOT_EXISTED));
    }

    public CreateOrderResponse createOrder(CreateOrderRequest request){
        Order newOrder = orderMapper.toOrder(request);
        newOrder.setStatus(1);
        newOrder = orderRepository.save(newOrder);
        List<OrderDetails> listOrderDetails = request.getItems();
        for(OrderDetails item : listOrderDetails){
            item.setOrderId(newOrder.getOrderId());
            orderDetailsRepository.save(item);
        }
        return CreateOrderResponse.builder()
                .order(newOrder)
                .items(listOrderDetails)
                .build();
    }
}
