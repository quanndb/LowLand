package com.coffee.lowland.DTO.response.blog;

import com.coffee.lowland.DTO.response.auth.UserResponse;
import com.coffee.lowland.DTO.response.utilities.PageServiceResponse;
import com.coffee.lowland.model.Blog;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthorBlogs {
    UserResponse author;
    PageServiceResponse<Blog> blogs;
}
