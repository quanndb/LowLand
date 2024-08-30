package com.coffee.lowland.DTO.response.utilities;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ListItemResponse<T> {
    List<T> content;
    boolean first;
    boolean last;
    int totalPages;
    int totalElements;
    int size;
    int number;
}
