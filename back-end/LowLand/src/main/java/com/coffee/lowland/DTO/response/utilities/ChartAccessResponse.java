package com.coffee.lowland.DTO.response.utilities;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChartAccessResponse {
    String date;
    Long total;
}
