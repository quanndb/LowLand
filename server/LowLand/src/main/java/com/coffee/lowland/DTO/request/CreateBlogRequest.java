package com.coffee.lowland.DTO.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateBlogRequest {
    String title;
    String content;
    String imageURL;
    String createdDate;
    String createdBy;
    String updatedDate;
    String updatedBy;
}
