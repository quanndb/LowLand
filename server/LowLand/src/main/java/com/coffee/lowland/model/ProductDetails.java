package com.coffee.lowland.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int productDetailsId;
    float price;
    int productId;
    int productSizeId;
}
