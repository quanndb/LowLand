package com.coffee.lowland.service;

import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.Blog;
import com.coffee.lowland.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BlogService {
    @Autowired
    private BlogRepository blogRepository;
    public Blog addBlog(Blog request){
        return blogRepository.save(request);
    }

    public Blog updateBlog(Blog request){
        Blog foundBlog = blogRepository.findById(request.getBlogId()).orElseThrow(()->
                new AppExceptions(ErrorCode.BLOG_NOT_EXISTED)
        );
        return blogRepository.save(foundBlog);
    }

    public void deleteBlog(int blogID){
        Blog foundBLog = blogRepository.findById(blogID).orElseThrow(()->
                new AppExceptions(ErrorCode.BLOG_NOT_EXISTED)
        );
        blogRepository.deleteById(blogID);
    }

    public boolean blogExists(int blogId){
        return blogRepository.existsById(blogId);
    }
}
