package com.coffee.lowland.DTO.response.blog;

import com.coffee.lowland.DTO.response.auth.UserResponse;
import com.coffee.lowland.model.BlogContent;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlogDetails {
    String blogId;
    UserResponse author;
    String categoryId;
    String imageURL;
    String title;
    LocalDateTime date;
    LocalDateTime lastUpdate;
    String updatedBy;
    String description;
    List<BlogContent> content;
}
