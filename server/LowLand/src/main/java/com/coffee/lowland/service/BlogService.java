package com.coffee.lowland.service;

import com.coffee.lowland.model.Blog;
import com.coffee.lowland.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogService {

    @Autowired
    BlogRepository blogRepository;

    public Page<Blog> getBlogs(int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);
        return blogRepository.findAll(pageable);
    }

    public List<Blog> getBlog(Integer id){
        return blogRepository.findBlogById(id);
    }

    public Blog postBlog(Blog newBlog){
        return blogRepository.save(newBlog);
    }

    public void deleteBlog(Integer id){
         blogRepository.deleteById(id);
    }
}
