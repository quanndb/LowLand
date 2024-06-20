package com.coffee.lowland.DTO.response.order;

import com.coffee.lowland.model.Order;
import com.coffee.lowland.model.OrderDetails;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class GetOrdersResponse {
    int orderId;
    int orderCode;
    String customerName;
    String phoneNumber;
    String address;
    LocalDateTime createdDate;
    String createdBy;
    String productName;
    String sizeName;
    int quantity;
    float price;
    float totalMoney;
    String imageUrl;
    int status;
}
