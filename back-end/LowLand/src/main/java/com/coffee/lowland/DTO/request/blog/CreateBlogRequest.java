package com.coffee.lowland.DTO.request.blog;

import com.coffee.lowland.model.BlogContent;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateBlogRequest {
    String categoryId;
    String imageURL;
    String title;
    String description;
    List<BlogContent> content;
}
