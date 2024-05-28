package com.coffee.lowland.service;

import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.Blog;
import com.coffee.lowland.repository.BlogRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class BlogService {

    BlogRepository blogRepository;

    public Page<Blog> getBlogs(int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);
        return blogRepository.findAll(pageable);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN') or #id == authentication.name")
    public Blog getBlog(String id){
        return blogRepository.findById(id).orElseThrow(()->new AppExceptions(ErrorCode.BLOG_NOT_EXIST));
    }

    public Blog postBlog(Blog newBlog){
        return blogRepository.save(newBlog);
    }

    public void deleteBlog(String id){
         blogRepository.deleteById(id);
    }
}
