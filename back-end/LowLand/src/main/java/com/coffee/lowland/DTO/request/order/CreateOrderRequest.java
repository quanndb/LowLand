package com.coffee.lowland.DTO.request.order;

import com.coffee.lowland.model.OrderDetails;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateOrderRequest {
    @NotBlank(message = "ORDER_FIELD_NOT_BE_BLANK")
    String customerName;
    @NotBlank(message = "ORDER_FIELD_NOT_BE_BLANK")
    String phoneNumber;
    @NotBlank(message = "ORDER_FIELD_NOT_BE_BLANK")
    String address;
    @Size(min = 1, message = "PRODUCT_DETAIL_NOT_EMPTY")
    List<OrderDetails> items;
    String message;
}
