package com.coffee.lowland.service;

import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.Order;
import com.coffee.lowland.repository.OrderRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class OrderService {
    OrderRepository orderRepository;

    public Order getCurrentOrder(int id){
        Order foundOrder = orderRepository.findById(id).orElseThrow(
                ()->  new AppExceptions(ErrorCode.ORDER_NOT_EXISTED));

        return foundOrder;
    }
}
