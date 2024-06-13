package com.coffee.lowland.DTO.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CancelPaymentRequest {
    int orderCode;
    String reason;
}
