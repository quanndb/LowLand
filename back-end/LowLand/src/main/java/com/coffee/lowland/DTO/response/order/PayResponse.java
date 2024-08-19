package com.coffee.lowland.DTO.response.order;

import com.coffee.lowland.DTO.response.APIResponse;
import jakarta.security.auth.message.callback.PasswordValidationCallback;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PayResponse {
    String accountNumber;
    int amount;
    String description;
    String reference;
    String transactionDateTime;
    String currency;
    int orderCode;
    String paymentLinkId;
    String code;
    String desc;
}
