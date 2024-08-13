package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.order.ApproveOrderRequest;
import com.coffee.lowland.DTO.request.order.CancelOrderRequest;
import com.coffee.lowland.DTO.request.order.CreateOrderRequest;
import com.coffee.lowland.DTO.request.order.UpdateOrderRequest;
import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.service.Order.OrderService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class OrderController {
    OrderService orderService;

    @GetMapping
    public APIResponse<Object> getOrders(){
        return APIResponse.builder()
                .code(2000)
                .result(orderService.getOrders())
                .build();
    }

    @PutMapping("/customer-order")
    public APIResponse<Object> manageOrder(@RequestBody ApproveOrderRequest request){
        return APIResponse.builder()
                .code(2000)
                .result(orderService.manageOrder(request))
                .build();
    }

    @GetMapping("/{orderId}")
    public APIResponse<Object> getOrderByOrderId(@PathVariable String orderId){
        return APIResponse.builder()
                .code(2000)
                .result(orderService.getOrder(orderId))
                .build();
    }
    @PostMapping("/new-order")
    public APIResponse<String> createOrder(@RequestBody @Valid CreateOrderRequest request){
        return APIResponse.<String>builder()
                .code(2000)
                .message("Create order successfully!")
                .result(orderService.createOrder(request))
                .build();
    }

    @PutMapping("/cancel-order")
    public APIResponse<String> cancelOrder(@RequestBody CancelOrderRequest request){
        return APIResponse.<String>builder()
                .code(2000)
                .result(orderService.cancelOrder(request))
                .build();
    }

    @PutMapping("/my-orders")
    public APIResponse<?> updateOrder(@RequestBody UpdateOrderRequest request){
        return APIResponse.builder()
                .code(2000)
                .result(orderService.updateOrder(request))
                .build();
    }

    @GetMapping("/my-orders")
    public APIResponse<Object> getMyOrder() {
        return APIResponse.<Object>builder()
                .code(2000)
                .result(orderService.getMyOrders())
                .build();
    }

    @PostMapping("/pay-result")
    public APIResponse<String> payResult(@RequestBody Object request){
        return APIResponse.<String>builder()
                .code(2000)
                .result(orderService.payResult(request))
                .build();
    }
}
