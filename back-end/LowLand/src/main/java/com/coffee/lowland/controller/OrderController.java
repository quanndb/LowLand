package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.order.*;
import com.coffee.lowland.DTO.response.order.GetOrdersResponse;
import com.coffee.lowland.DTO.response.utilities.APIResponse;
import com.coffee.lowland.DTO.response.utilities.PageServiceResponse;
import com.coffee.lowland.model.Order;
import com.coffee.lowland.service.Order.OrderService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import vn.payos.type.Webhook;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {
    OrderService orderService;

    @GetMapping
    public APIResponse<PageServiceResponse<GetOrdersResponse>> getOrders(@RequestParam(required = false, defaultValue = "") String userId,
                                                                         @RequestParam(required = false, defaultValue = "1") Integer page,
                                                                         @RequestParam(required = false, defaultValue = "10") Integer size,
                                                                         @RequestParam(required = false, defaultValue = "") String query,
                                                                         @RequestParam(required = false, defaultValue = "") String sortedBy,
                                                                         @RequestParam(required = false, defaultValue = "DESC") String sortDirection,
                                                                         @RequestParam(required = false, defaultValue = "") Integer status) {
        return APIResponse.<PageServiceResponse<GetOrdersResponse>>builder()
                .code(2000)
                .result(orderService.getOrders(page, size, query, sortedBy, sortDirection, status, userId))
                .build();
    }

    @PutMapping("/{orderId}")
    public APIResponse<Order> approveOrder(@PathVariable String orderId,
                                           @RequestBody @Valid ApproveOrderRequest request) {
        return APIResponse.<Order>builder()
                .code(2000)
                .result(orderService.approveOrder(orderId, request))
                .build();
    }

    @PostMapping("/payment-result")
    public APIResponse<String> handlePaymentResult(@RequestBody Webhook request) throws Exception {
        return APIResponse.<String>builder()
                .code(2000)
                .result(orderService.payResult(request))
                .build();
    }
}
