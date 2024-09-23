package com.coffee.lowland.service.Pay;

import com.coffee.lowland.DTO.request.order.CancelPaymentRequest;
import com.coffee.lowland.DTO.request.order.PayOrderItem;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.Order;
import com.coffee.lowland.JPA.repository.OrderRepository;
import com.coffee.lowland.service.Order.OrderDetailsService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import vn.payos.PayOS;
import vn.payos.type.*;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PayService {
    OrderDetailsService orderDetailsService;
    OrderRepository orderRepository;
    PayOS payOS;

    @NonFinal
    @Value("${app.origin-client}") String originClient;

    public String createPaymentLink(String orderId) throws Exception {
        Order foundOrder = orderRepository.findById(orderId)
                .orElseThrow(()->new AppExceptions(ErrorCode.ORDER_NOT_EXISTED));
        if(foundOrder.getStatus() != 0) throw new AppExceptions(ErrorCode.RESOLVED_ORDER);
        List<PayOrderItem> response = orderDetailsService.getOrderDetailsForPay(orderId);
        List<ItemData> items = new ArrayList<>();
        double amount = 0d;
        for (PayOrderItem item : response) {
            amount += (item.getPrice()*item.getQuantity());
            items.add(ItemData.builder()
                            .name(item.getName())
                            .price(item.getPrice())
                            .quantity(item.getQuantity())
                    .build());
        }

        double tax = amount * 0.1;
        amount+=tax;
        items.add(ItemData.builder()
                        .name("Tax 10%")
                        .quantity(1)
                        .price((int) tax)
                .build());

        String payment_link = payOS.createPaymentLink(PaymentData.builder()
                        .orderCode(foundOrder.getOrderCode())
                        .amount((int) amount)
                        .description("Lowland TT "+foundOrder.getOrderCode())
                        .buyerAddress(foundOrder.getAddress())
                        .buyerPhone(foundOrder.getPhoneNumber())
                        .buyerName(foundOrder.getCustomerName())
                        .returnUrl(originClient+"/user")
                        .cancelUrl(originClient+"/user")
                        .items(items)
                        .build())
                .getCheckoutUrl();
        foundOrder.setPaymentLink(payment_link);
        orderRepository.save(foundOrder);

        return payment_link;
    }

    public void cancelPaymentLink(CancelPaymentRequest requestBody) throws Exception {
        payOS.cancelPaymentLink(requestBody.getOrderCode(), requestBody.getReason());
    }

    public WebhookData verifyPayment(Webhook requestBody) throws Exception {
        return payOS.verifyPaymentWebhookData(requestBody);
    }
}
