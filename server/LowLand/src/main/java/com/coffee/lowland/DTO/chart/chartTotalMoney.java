package com.coffee.lowland.DTO.chart;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class chartTotalMoney {
    int dayInMonth;
    int totalMoney;
}
