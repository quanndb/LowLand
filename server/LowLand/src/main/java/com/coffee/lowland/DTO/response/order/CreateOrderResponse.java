package com.coffee.lowland.DTO.response.order;

import com.coffee.lowland.model.Order;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class CreateOrderResponse {
    Order order;
    List<OrderDetailsResponse> items;
}
