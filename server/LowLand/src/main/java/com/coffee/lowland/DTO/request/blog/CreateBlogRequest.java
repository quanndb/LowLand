package com.coffee.lowland.DTO.request.blog;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateBlogRequest {
    String title;
    String content;
    String imageURL;
    LocalDateTime createdDate;
    String createdBy;
    LocalDateTime updatedDate;
    String updatedBy;
}
