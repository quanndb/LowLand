package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.order.CancelPaymentRequest;
import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.service.PayService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pay")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class PayController {
    PayService payService;

    @PostMapping("/create-payment-link")
    public APIResponse<String> createPayment(@RequestParam int orderId){
        return APIResponse.<String>builder()
                .code(2000)
                .result(payService.createPaymentLink(orderId))
                .build();
    }

    @PostMapping("/cancel-payment")
    public APIResponse cancel(@RequestBody CancelPaymentRequest request){

        return payService.cancelPaymentLink(request).block();
    }

    @PostMapping("/verify-payment")
    public APIResponse verifyPayment(@RequestBody Object request){
        return payService.verifyPayment(request).block();
    }
}
