package com.coffee.lowland.DTO.request.order;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApproveOrderRequest {
    @NotBlank(message = "ORDER_FIELD_NOT_BE_BLANK")
    String customerName;
    @NotBlank(message = "ORDER_FIELD_NOT_BE_BLANK")
    String phoneNumber;
    @NotBlank(message = "ORDER_FIELD_NOT_BE_BLANK")
    String address;
    @Min(value = 0, message = "INVALID_ORDER_STATUS")
    @Max(value = 3, message = "INVALID_ORDER_STATUS")
    int status;
    String message;
    String note;
}
