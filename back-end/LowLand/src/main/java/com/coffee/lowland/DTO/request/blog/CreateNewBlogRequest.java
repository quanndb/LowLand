package com.coffee.lowland.DTO.request.blog;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateNewBlogRequest {
        @NotBlank(message = "BLOG_FIELD_NOT_BLANK")
        String categoryName;
        @NotBlank(message = "BLOG_FIELD_NOT_BLANK")
        String imageURL;
        @NotBlank(message = "BLOG_FIELD_NOT_BLANK")
        String title;
        String description;
        @NotNull(message = "BLOG_FIELD_NOT_BLANK")
        List<BlogContentDTO> content;
}
