package com.coffee.lowland.service.Pay;

import com.coffee.lowland.DTO.request.order.CancelPaymentRequest;
import com.coffee.lowland.DTO.request.order.CreatePayRequest;
import com.coffee.lowland.DTO.response.utilities.APIResponse;
import com.coffee.lowland.DTO.response.order.PayResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "PayServer", url = "${PAY_SERVER}")
public interface PayRepo {

    @PostMapping("/create-payment-link")
    APIResponse<Object> createPaymentLink(@RequestBody CreatePayRequest request);

    @PostMapping("/cancel-payment")
    APIResponse<Object> cancelPaymentLink(@RequestBody CancelPaymentRequest request);

    @PostMapping("/verify-payment")
    APIResponse<PayResponse> verifyPayment(@RequestBody Object request);
}
