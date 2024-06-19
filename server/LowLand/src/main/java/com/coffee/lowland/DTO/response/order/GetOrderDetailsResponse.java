package com.coffee.lowland.DTO.response.order;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class GetOrderDetailsResponse {
    int quantity;
    float price;
    float totalMoney;
    String productName;
    String imageUrl;
    String sizeName;
}
