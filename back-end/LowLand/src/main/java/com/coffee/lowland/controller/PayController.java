package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.response.utilities.APIResponse;
import com.coffee.lowland.service.Pay.PayService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import vn.payos.type.Webhook;
import vn.payos.type.WebhookData;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class PayController {
    PayService payService;

    @PostMapping
    public APIResponse<String> createPayment(@RequestParam String orderId) throws Exception {
        return APIResponse.<String>builder()
                .code(2000)
                .result(payService.createPaymentLink(orderId))
                .build();
    }

    @GetMapping("/verified-payment")
    public APIResponse<WebhookData> verifyPayment(@RequestBody Webhook request) throws Exception {
        return APIResponse.<WebhookData>builder()
                .result(payService.verifyPayment(request))
                .build();
    }
}
