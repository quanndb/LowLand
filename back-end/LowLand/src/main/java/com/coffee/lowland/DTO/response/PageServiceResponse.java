package com.coffee.lowland.DTO.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PageServiceResponse<T> {
    Integer totalRecords;
    Integer totalPages;
    Integer page;
    Boolean isFirst;
    Boolean isLast;
    Integer size;
    String query;
    String sortedBy;
    String sortDirection;
    List<?> response;
}
