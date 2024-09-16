package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.account.CreateAccountRequest;
import com.coffee.lowland.DTO.request.account.UpdateAccountRequest;
import com.coffee.lowland.DTO.request.order.CreateOrderRequest;
import com.coffee.lowland.DTO.request.order.UpdateOrderRequest;
import com.coffee.lowland.DTO.response.utilities.APIResponse;
import com.coffee.lowland.service.Account.AccountService;
import com.coffee.lowland.service.Order.OrderService;
import com.coffee.lowland.service.Utilities.JSONMapper;
import com.coffee.lowland.service.Utilities.ObjectValidator;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AccountController {

    AccountService accountService;
    OrderService orderService;
    ObjectValidator objectValidator;
    JSONMapper jsonMapper;

    @GetMapping
    public APIResponse<?> getAccounts(
            @RequestParam(required = false, defaultValue = "1") int page,
            @RequestParam(required = false, defaultValue = "10") int size,
            @RequestParam(required = false, defaultValue = "") String sortedBy,
            @RequestParam(required = false, defaultValue = "DESC") String sortDirection,
            @RequestParam(required = false, defaultValue = "") String query,
            @RequestParam(required = false, defaultValue = "") String role) {
        return APIResponse.builder()
                .code(2000)
                .result(accountService.getAccounts(page, size, sortedBy, sortDirection, query, role))
                .build();
    }

    @GetMapping("/{accountId}")
    public APIResponse<?> getAccountById(@PathVariable String accountId) {
        return APIResponse.builder()
                .code(2000)
                .result(accountService.getAccountById(accountId))
                .build();
    }

    @PostMapping
    public APIResponse<?> createAccount(@RequestBody @Valid CreateAccountRequest account) {
        return APIResponse.builder()
                .code(2000)
                .result(accountService.createAccount(account))
                .build();
    }

    @DeleteMapping("/{accountId}")
    public APIResponse<?> deleteAccount(@PathVariable String accountId) {
        return APIResponse.builder()
                .code(2000)
                .result(accountService.deleteAccount(accountId))
                .build();
    }

    @PostMapping("/{accountId}")
        public APIResponse<?> updateAccount(
            @RequestParam(value = "userInfo", required = false) String userInfo,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @PathVariable String accountId) throws IOException {

        UpdateAccountRequest updateRequest = jsonMapper.JSONToObject(userInfo, UpdateAccountRequest.class);
        objectValidator.validateObject(updateRequest);
        return APIResponse.builder()
                .code(2000)
                .result(accountService.updateAccount(accountId, updateRequest, image))
                .build();
    }

    @GetMapping("/{accountId}/orders")
    public APIResponse<?> getOrders(@PathVariable String accountId,
                                    @RequestParam(required = false, defaultValue = "1") Integer page,
                                    @RequestParam(required = false, defaultValue = "10") Integer size,
                                    @RequestParam(required = false, defaultValue = "") String query,
                                    @RequestParam(required = false, defaultValue = "") String sortedBy,
                                    @RequestParam(required = false, defaultValue = "DESC") String sortDirection,
                                    @RequestParam(required = false, defaultValue = "") Integer status) {
        return APIResponse.builder()
                .code(2000)
                .result(orderService.getOrders(page, size, query, sortedBy, sortDirection, status, accountId))
                .build();
    }

    @GetMapping("/{accountId}/orders/{orderId}")
    public APIResponse<Object> getOrderDetails(@PathVariable String accountId, @PathVariable String orderId) {
        return APIResponse.builder()
                .code(2000)
                .result(orderService.getOrderDetails(accountId, orderId))
                .build();
    }

    @PostMapping("/{accountId}/orders")
    public APIResponse<String> createOrder(
            @PathVariable String accountId,
            @RequestBody @Valid CreateOrderRequest request) {
        return APIResponse.<String>builder()
                .code(2000)
                .message("Order created successfully!")
                .result(orderService.createOrder(accountId, request))
                .build();
    }

    @PutMapping("/{accountId}/orders/{orderId}")
    public APIResponse<?> updateOrder(@PathVariable String accountId,
                                      @PathVariable String orderId,
                                      @RequestBody @Valid UpdateOrderRequest request) {
        return APIResponse.builder()
                .code(2000)
                .result(orderService.updateOrder(accountId, orderId, request))
                .build();
    }

    @DeleteMapping("/{accountId}/orders/{orderId}")
    public APIResponse<String> cancelOrder(@PathVariable String accountId,
                                           @PathVariable String orderId,
                                           @RequestBody(required = false) String note) throws Exception {
        return APIResponse.<String>builder()
                .code(2000)
                .result(orderService.cancelOrder(accountId, orderId, note))
                .build();
    }
}
