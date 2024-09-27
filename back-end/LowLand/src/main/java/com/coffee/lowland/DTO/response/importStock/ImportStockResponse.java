package com.coffee.lowland.DTO.response.importStock;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ImportStockResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String importStockId;
    String importCode;
    String supplierName;
    String description;
    LocalDateTime updatedDate;
    String updatedBy;
    LocalDateTime importDate;
    String materialsList;
    Long totalPrice;
}
