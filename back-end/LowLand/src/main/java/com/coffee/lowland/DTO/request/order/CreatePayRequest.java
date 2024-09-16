package com.coffee.lowland.DTO.request.order;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class CreatePayRequest {
    int amount;
    long orderCode;
    List<PayOrderItem> items;
}
