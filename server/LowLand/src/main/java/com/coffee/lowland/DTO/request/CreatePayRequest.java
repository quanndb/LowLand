package com.coffee.lowland.DTO.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreatePayRequest {
    int amount;
    int orderCode;
    Set<OrderDetailRequest> items;
}
