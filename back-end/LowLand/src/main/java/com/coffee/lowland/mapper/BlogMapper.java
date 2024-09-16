package com.coffee.lowland.mapper;

import com.coffee.lowland.DTO.request.blog.CreateBlogRequest;
import com.coffee.lowland.DTO.response.blog.BlogDetails;
import com.coffee.lowland.model.Blog;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface BlogMapper {
    Blog createBlog(CreateBlogRequest request);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(@MappingTarget Blog res, CreateBlogRequest req);
    void getDetails(@MappingTarget BlogDetails res, Blog req);
}
