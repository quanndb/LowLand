package com.coffee.lowland.DTO.response.order;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

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
