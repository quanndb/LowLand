package com.coffee.lowland.service;

import com.coffee.lowland.DTO.request.order.CancelOrderRequest;
import com.coffee.lowland.DTO.request.order.CancelPaymentRequest;
import com.coffee.lowland.DTO.request.order.CreatePayRequest;
import com.coffee.lowland.DTO.request.order.PayOrderItem;
import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.DTO.response.order.PayResponse;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.Order;
import com.coffee.lowland.repository.OrderRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.ForkJoinPool;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PayService {

    WebClient.Builder webClientBuilder;
    OrderDetailsService orderDetailsService;
    OrderRepository orderRepository;

    @NonFinal
    @Value("${PAY_SERVER}")
    String PAY_SERVER;

    public String createPaymentLink(String orderId) {
        WebClient webClient = webClientBuilder.baseUrl(PAY_SERVER).build();
        Order foundOrder = orderRepository.findById(orderId)
                .orElseThrow(()->new AppExceptions(ErrorCode.ORDER_NOT_EXISTED));
        List<Object[]> response = orderDetailsService.getOrderDetails(orderId);

        float amount = 0;
        List<PayOrderItem> items = new ArrayList<>();
        for (Object[] result : response) {
            PayOrderItem item = new PayOrderItem();
            item.setQuantity((Integer) result[0]);
            item.setPrice(((BigDecimal) result[1]).intValue());
            item.setName((String) result[3]);
            amount += (item.getPrice()*item.getQuantity());
            items.add(item);
        }

        amount+= (float) (amount*0.1);
        CreatePayRequest req = CreatePayRequest.builder()
                .amount((int) amount)
                .orderCode(foundOrder.getOrderCode())
                .items(items)
                .build();

        String payment_link = (String) Objects.requireNonNull(webClient.post()
                .uri("/create-payment-link")
                .bodyValue(req)
                .retrieve()
                .bodyToMono(APIResponse.class).block()).getResult();
        foundOrder.setPaymentLink(payment_link);
        orderRepository.save(foundOrder);

        return payment_link;
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
