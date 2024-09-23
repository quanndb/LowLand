package com.coffee.lowland.DTO.request.blog;

import com.coffee.lowland.model.BlogContent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateBlogRequest {
    @NotBlank(message = "BLOG_FIELD_NOT_BLANK")
    String categoryName;
    @NotBlank(message = "BLOG_FIELD_NOT_BLANK")
    String imageId;
    @NotBlank(message = "BLOG_FIELD_NOT_BLANK")
    String title;
    String description;
    @NotNull(message = "BLOG_FIELD_NOT_BLANK")
    List<BlogContent> content;
}
