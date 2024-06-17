package com.coffee.lowland.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Entity
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductSize {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int productSizeId;
    String sizeName;
    String description;
    LocalDateTime createdDate;
    String createdBy;
    LocalDateTime updatedDate;
    String updatedBy;
}
