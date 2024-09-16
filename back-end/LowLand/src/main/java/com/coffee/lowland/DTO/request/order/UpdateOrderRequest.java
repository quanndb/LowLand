package com.coffee.lowland.DTO.request.order;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateOrderRequest {
    @NotBlank(message = "ORDER_FIELD_NOT_BE_BLANK")
    String customerName;
    @NotBlank(message = "ORDER_FIELD_NOT_BE_BLANK")
    String phoneNumber;
    @NotBlank(message = "ORDER_FIELD_NOT_BE_BLANK")
    String address;
    String message;
}
