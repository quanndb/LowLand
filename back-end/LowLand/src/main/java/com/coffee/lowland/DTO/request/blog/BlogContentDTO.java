package com.coffee.lowland.DTO.request.blog;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BlogContentDTO {
    @NotBlank(message = "BLOG_FIELD_NOT_BLANK")
    String type;
    @NotNull(message = "BLOG_FIELD_NOT_BLANK")
    String data;
    String title;
}