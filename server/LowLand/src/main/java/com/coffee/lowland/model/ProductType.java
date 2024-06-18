package com.coffee.lowland.model;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int productTypeId;
    String code;
    String typeName;
    int productId;
    String description;
    String createdDate;
    String createdBy;
    String updatedDate;
    String updatedBy;
}
