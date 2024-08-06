package com.coffee.lowland.DTO;

import com.coffee.lowland.model.ImportStock;
import com.coffee.lowland.model.ImportStockDetails;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ImportStockDTO {
    ImportStock data;
    List<ImportStockDetails> listDetails;
}
