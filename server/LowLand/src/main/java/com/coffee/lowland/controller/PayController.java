package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.CancelPaymentRequest;
import com.coffee.lowland.DTO.request.CreatePayRequest;
import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.DTO.response.UserResponse;
import com.coffee.lowland.service.PayService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/pay")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class PayController {
    PayService payService;

    @PostMapping("/create-payment-link")
    public Mono<APIResponse> createPayment(@RequestBody CreatePayRequest request){
        return payService.createPaymentLink(request);
    }

    @PostMapping("/cancel-payment")
    public Mono<APIResponse> cancel(@RequestBody CancelPaymentRequest request){
        return payService.cancelPaymentLink(request);
    }

    @PostMapping("/verify-payment")
    public Mono<APIResponse> verifyPayment(@RequestBody Object request){
        return payService.verifyPayment(request);
    }
}
