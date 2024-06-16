package com.coffee.lowland.DTO.request.order;

import com.coffee.lowland.model.OrderDetails;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreatePayRequest {
    int amount;
    int orderCode;
    List<OrderDetails> items;
}
