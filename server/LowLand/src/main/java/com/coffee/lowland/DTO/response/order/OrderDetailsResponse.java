package com.coffee.lowland.DTO.response.order;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class OrderDetailsResponse {
    int quantity;
    float totalMoney;
    int orderId;
    int productDetailsId;
}
