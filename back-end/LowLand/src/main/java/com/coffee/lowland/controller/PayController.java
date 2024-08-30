package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.response.utilities.APIResponse;
import com.coffee.lowland.service.Pay.PayService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class PayController {
    PayService payService;

    @PostMapping
    public APIResponse<String> createPayment(@RequestParam String orderId){
        return APIResponse.<String>builder()
                .code(2000)
                .result(payService.createPaymentLink(orderId))
                .build();
    }

    @GetMapping("/verified-payment")
    public APIResponse<?> verifyPayment(@RequestBody Object request){
        return payService.verifyPayment(request);
    }
}
