package com.coffee.lowland.service;

import com.coffee.lowland.DTO.request.order.CancelPaymentRequest;
import com.coffee.lowland.DTO.request.order.CreatePayRequest;
import com.coffee.lowland.DTO.response.APIResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class PayService {

    private final WebClient.Builder webClientBuilder;
    @Value("${PAY_SERVER}")
    private String PAY_SERVER;

    public Mono<APIResponse> createPaymentLink(CreatePayRequest requestBody) {
        WebClient webClient = webClientBuilder.baseUrl(PAY_SERVER).build();
        return webClient.post()
                .uri("/create-payment-link")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(APIResponse.class);
    }

    public Mono<APIResponse> cancelPaymentLink(CancelPaymentRequest requestBody) {
        WebClient webClient = webClientBuilder.baseUrl(PAY_SERVER).build();
        return webClient.post()
                .uri("/cancel-payment")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(APIResponse.class);
    }

    public Mono<APIResponse> verifyPayment(Object requestBody) {
        WebClient webClient = webClientBuilder.baseUrl(PAY_SERVER).build();
        return webClient.post()
                .uri("/verify-payment")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(APIResponse.class);
    }
}
