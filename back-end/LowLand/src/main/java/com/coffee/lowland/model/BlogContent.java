package com.coffee.lowland.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class BlogContent {
    @NotBlank(message = "BLOG_FIELD_NOT_BLANK")
    String type;
    @NotNull(message = "BLOG_FIELD_NOT_BLANK")
    String data;
    String title;
}
