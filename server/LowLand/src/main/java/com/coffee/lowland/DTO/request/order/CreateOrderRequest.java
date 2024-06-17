package com.coffee.lowland.DTO.request.order;

import com.coffee.lowland.model.OrderDetails;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateOrderRequest {
    String customerName;
    String phoneNumber;
    String address;
    String createdBy;
    int accountId;
    List<OrderDetails> items;
}
