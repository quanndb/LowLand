package com.coffee.lowland.DTO.response.order;

import com.coffee.lowland.model.Order;
import com.coffee.lowland.model.OrderDetails;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateOrderResponse {
    Order order;
    List<OrderDetails> items;
}
