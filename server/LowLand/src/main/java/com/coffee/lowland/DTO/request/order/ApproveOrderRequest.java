package com.coffee.lowland.DTO.request.order;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApproveOrderRequest {
    String orderId;
    String customerName;
    String phoneNumber;
    String address;
    int status;
    String note;
}
