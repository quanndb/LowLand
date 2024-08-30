package com.coffee.lowland.DTO.response.utilities;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StoreStuff {
    Long customer;
    Long orderInMonth;
    Long product;
    Long productType;
    Long material;
}
