package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.account.CreateAccountRequest;
import com.coffee.lowland.DTO.request.account.UpdateAccountRequest;
import com.coffee.lowland.DTO.request.order.CreateOrderRequest;
import com.coffee.lowland.DTO.request.order.UpdateOrderRequest;
import com.coffee.lowland.DTO.response.auth.UserPage;
import com.coffee.lowland.DTO.response.auth.UserResponse;
import com.coffee.lowland.DTO.response.order.GetOrderResponse;
import com.coffee.lowland.DTO.response.order.GetOrdersResponse;
import com.coffee.lowland.DTO.response.utilities.APIResponse;
import com.coffee.lowland.DTO.response.utilities.PageServiceResponse;
import com.coffee.lowland.model.Order;
import com.coffee.lowland.service.Account.AccountService;
import com.coffee.lowland.service.Order.OrderService;
import com.coffee.lowland.service.Utilities.JSONMapper;
import com.coffee.lowland.service.Utilities.ObjectValidator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Account controller", description = "Controller for managing accounts and its resources")
public class AccountController {

    AccountService accountService;
    OrderService orderService;
    ObjectValidator objectValidator;
    JSONMapper jsonMapper;

    @Operation(summary = "Get accounts", description = "Get accounts  by page, size, query, sorted by, sort direction, role")
    @GetMapping
    public APIResponse<PageServiceResponse<UserPage>> getAccounts(
            @RequestParam(required = false, defaultValue = "1") int page,
            @RequestParam(required = false, defaultValue = "10") int size,
            @RequestParam(required = false, defaultValue = "") String sortedBy,
            @RequestParam(required = false, defaultValue = "DESC") String sortDirection,
            @RequestParam(required = false, defaultValue = "") String query,
            @RequestParam(required = false, defaultValue = "") String role) {
        return APIResponse.<PageServiceResponse<UserPage>>builder()
                .code(2000)
                .result(accountService.getAccounts(page, size, sortedBy, sortDirection, query, role))
                .build();
    }

    @Operation(summary = "Get account information", description = "Get account information by accountId")
    @GetMapping("/{accountId}")
    public APIResponse<UserResponse> getAccountById(@PathVariable String accountId) {
        return APIResponse.<UserResponse>builder()
                .code(2000)
                .result(accountService.getAccountById(accountId))
                .build();
    }

    @Operation(summary = "Create account", description = "Create new account by ADMIN")
    @PostMapping
    public APIResponse<UserResponse> createAccount(@RequestBody @Valid CreateAccountRequest account) {
        return APIResponse.<UserResponse>builder()
                .code(2000)
                .result(accountService.createAccount(account))
                .build();
    }

    @Operation(summary = "Deactivate account", description = "Deactivate account by accountId")
    @DeleteMapping("/{accountId}")
    public APIResponse<Boolean> deleteAccount(@PathVariable String accountId) {
        return APIResponse.<Boolean>builder()
                .code(2000)
                .result(accountService.deleteAccount(accountId))
                .build();
    }

    @Operation(summary = "Update account", description = "Update account by accountId")
    @PostMapping("/{accountId}")
        public APIResponse<UserResponse> updateAccount(
            @RequestParam(value = "userInfo", required = false) String userInfo,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @PathVariable String accountId) throws IOException {

        UpdateAccountRequest updateRequest = jsonMapper.JSONToObject(userInfo, UpdateAccountRequest.class);
        objectValidator.validateObject(updateRequest);
        return APIResponse.<UserResponse>builder()
                .code(2000)
                .result(accountService.updateAccount(accountId, updateRequest, image))
                .build();
    }
    @Operation(summary = "Get user's orders", description = "Get user's orders by page, size, query, sorted by, sort direction, status")
    @GetMapping("/{accountId}/orders")
    public APIResponse<PageServiceResponse<GetOrdersResponse>> getOrders(@PathVariable String accountId,
                                                                         @RequestParam(required = false, defaultValue = "1") Integer page,
                                                                         @RequestParam(required = false, defaultValue = "10") Integer size,
                                                                         @RequestParam(required = false, defaultValue = "") String query,
                                                                         @RequestParam(required = false, defaultValue = "") String sortedBy,
                                                                         @RequestParam(required = false, defaultValue = "DESC") String sortDirection,
                                                                         @RequestParam(required = false, defaultValue = "") Integer status) {
        return APIResponse.<PageServiceResponse<GetOrdersResponse>>builder()
                .code(2000)
                .result(orderService.getOrders(page, size, query, sortedBy, sortDirection, status, accountId))
                .build();
    }

    @Operation(summary = "Get details of order", description = "Get details of order by accountId & orderId")
    @GetMapping("/{accountId}/orders/{orderId}")
    public APIResponse<GetOrderResponse> getOrderDetails(@PathVariable String accountId, @PathVariable String orderId) {
        return APIResponse.<GetOrderResponse>builder()
                .code(2000)
                .result(orderService.getOrderDetails(accountId, orderId))
                .build();
    }

    @Operation(summary = "Create new order", description = "Create new order")
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

    @Operation(summary = "Update order", description = "Update order's information")
    @PutMapping("/{accountId}/orders/{orderId}")
    public APIResponse<Order> updateOrder(@PathVariable String accountId,
                                          @PathVariable String orderId,
                                          @RequestBody @Valid UpdateOrderRequest request) {
        return APIResponse.<Order>builder()
                .code(2000)
                .result(orderService.updateOrder(accountId, orderId, request))
                .build();
    }
    @Operation(summary = "Cancel order", description = "Cancel order(status = 3 & cancel payment link)")
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
