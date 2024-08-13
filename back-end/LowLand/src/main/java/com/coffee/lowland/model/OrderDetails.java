package com.coffee.lowland.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String orderDetailsId;
    @Min(value = 1, message = "QUANTITY_AT_LEAST")
    int quantity;
    Double totalMoney;
    String orderId;
    @NotNull(message = "PRODUCT_DETAIL_NOT_EMPTY")
    String productDetailsId;
}
