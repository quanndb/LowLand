package com.coffee.lowland.DTO.response.order;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@Entity
@AllArgsConstructor
@RequiredArgsConstructor
public class GetOrderDetailsResponse {
    @Id
    String orderDetailsId;
    int quantity;
    Double price;
    Double totalMoney;
    String productName;
    String imageUrl;
    String sizeName;
}
