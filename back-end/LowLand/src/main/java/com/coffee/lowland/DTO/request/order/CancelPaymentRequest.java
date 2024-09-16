package com.coffee.lowland.DTO.request.order;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class CancelPaymentRequest {
    @NotNull(message = "ORDER_FIELD_NOT_BE_BLANK")
    long orderCode;
    String reason;
}
