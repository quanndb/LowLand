package com.coffee.lowland.DTO.response.order;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class GetOrderResponse {
    int orderCode;
    String customerName;
    String phoneNumber;
    String address;
    LocalDateTime createdDate;
    String createdBy;
    int status;
    LocalDateTime updatedDate;
    String updatedBy;
    String paymentLink;
    String message;
    String note;
    List<GetOrderDetailsResponse> items;
}
