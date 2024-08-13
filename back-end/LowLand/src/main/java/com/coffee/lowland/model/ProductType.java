package com.coffee.lowland.model;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductType {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String productTypeId;
    String typeName;
    String description;
}
