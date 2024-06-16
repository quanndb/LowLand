package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.order.CreateOrderRequest;
import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.service.OrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class OrderController {
    OrderService orderService;

    @PostMapping
    public APIResponse<?> createOrder(@RequestBody CreateOrderRequest request){
        return APIResponse.builder()
                .code(2000)
                .message("Create order successfully")
                .result(orderService.createOrder(request))
                .build();
    }
}
