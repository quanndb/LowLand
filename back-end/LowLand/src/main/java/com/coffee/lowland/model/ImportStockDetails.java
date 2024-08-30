package com.coffee.lowland.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ImportStockDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String detailsId;
    String importStockId;
    String materialName;
    String description;
    Double quantity;
    Double price;
}
