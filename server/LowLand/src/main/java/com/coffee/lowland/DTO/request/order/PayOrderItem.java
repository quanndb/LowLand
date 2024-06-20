package com.coffee.lowland.DTO.request.order;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PayOrderItem {
    String name;
    int quantity;
    int price;
}
