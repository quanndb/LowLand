package com.coffee.lowland.service.Pay;

import com.coffee.lowland.DTO.request.order.CancelPaymentRequest;
import com.coffee.lowland.DTO.request.order.CreatePayRequest;
import com.coffee.lowland.DTO.request.order.PayOrderItem;
import com.coffee.lowland.DTO.response.utilities.APIResponse;
import com.coffee.lowland.DTO.response.order.PayResponse;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.Order;
import com.coffee.lowland.JPA.repository.OrderRepository;
import com.coffee.lowland.service.Order.OrderDetailsService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PayService {
    OrderDetailsService orderDetailsService;
    OrderRepository orderRepository;
    PayRepo payRepo;

    public String createPaymentLink(String orderId) {
        Order foundOrder = orderRepository.findById(orderId)
                .orElseThrow(()->new AppExceptions(ErrorCode.ORDER_NOT_EXISTED));
        if(foundOrder.getStatus() != 0) throw new AppExceptions(ErrorCode.RESOLVED_ORDER);
        List<PayOrderItem> response = orderDetailsService.getOrderDetailsForPay(orderId);
        double amount = 0d;
        for (PayOrderItem item : response) {
            amount += (item.getPrice()*item.getQuantity());
        }

        amount += amount * 0.1;
        CreatePayRequest req = CreatePayRequest.builder()
                .amount((int) amount)
                .orderCode(foundOrder.getOrderCode())
                .items(response)
                .build();

        String payment_link = (String) payRepo.createPaymentLink(req).getResult();
        foundOrder.setPaymentLink(payment_link);
        orderRepository.save(foundOrder);

        return payment_link;
    }

    public void cancelPaymentLink(CancelPaymentRequest requestBody) {
        payRepo.cancelPaymentLink(requestBody);
    }

    public APIResponse<PayResponse> verifyPayment(Object requestBody) {
        return payRepo.verifyPayment(requestBody);
    }
}
