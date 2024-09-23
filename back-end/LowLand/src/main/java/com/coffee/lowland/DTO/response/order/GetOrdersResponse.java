package com.coffee.lowland.DTO.response.order;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@RequiredArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class GetOrdersResponse {
    @Id
    String orderId;
    Integer orderCode;
    String accountId;
    String customerName;
    String phoneNumber;
    String address;
    LocalDateTime createdDate;
    String createdBy;
    String productId;
    String productName;
    String sizeName;
    Integer quantity;
    Double price;
    Double totalMoney;
    String imageName;
    String imageUrl;
    int status;
}
