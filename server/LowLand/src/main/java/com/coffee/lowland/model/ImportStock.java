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

@Entity
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ImportStock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int importStockId;
    String importStockCode;
    String supplierName;
    String description;
    LocalDateTime import_date;
}
