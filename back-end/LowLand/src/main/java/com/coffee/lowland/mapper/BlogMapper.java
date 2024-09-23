package com.coffee.lowland.mapper;

import com.coffee.lowland.DTO.request.blog.CreateBlogRequest;
import com.coffee.lowland.DTO.request.blog.CreateNewBlogRequest;
import com.coffee.lowland.DTO.response.blog.BlogDetails;
import com.coffee.lowland.model.Blog;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface BlogMapper {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Blog createBlog(CreateNewBlogRequest request);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(@MappingTarget Blog res, CreateNewBlogRequest req);
    void getDetails(@MappingTarget BlogDetails res, Blog req);
}
