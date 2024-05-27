package com.coffee.lowland.controller;

import com.coffee.lowland.model.Blog;
import com.coffee.lowland.repository.BlogRepository;
import com.coffee.lowland.service.BlogService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/blogs")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class BlogController {

    BlogService blogService;
    BlogRepository blogRepository;

    @GetMapping("/")
    public ResponseEntity<Object> getBlogs(@RequestParam int page, @RequestParam int size){
        return ResponseEntity.status(HttpStatus.OK).body(blogService.getBlogs(page,size).get());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getBlog(@PathVariable String id){
        List<Blog> exitstBlog = blogService.getBlog(id);
        if(exitstBlog.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found");
        }
        else return ResponseEntity.status(HttpStatus.OK).body(exitstBlog.get(0));
    }

    @PostMapping("/")
    public ResponseEntity<Blog> postBlog(@RequestBody Blog newBlog){
        return ResponseEntity.status(HttpStatus.CREATED).body(blogService.postBlog(newBlog));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateBlog(@PathVariable String id, @RequestBody Blog newBlog){
        List<Blog> existBlog = blogRepository.findBlogById(id);
        if(existBlog.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found the blog");
        }
        else {
            existBlog.get(0).setTitle(newBlog.getTitle());
            existBlog.get(0).setContent(newBlog.getContent());
            existBlog.get(0).setDate((new Date()).toString());
            Blog updatedBlog = blogRepository.save(existBlog.get(0));
            return ResponseEntity.status(HttpStatus.OK).body(updatedBlog);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBlog(@PathVariable String id){
        List<Blog> existBlog = blogRepository.findBlogById(id);
        if(existBlog.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found the blog");
        }
        else {
            blogService.deleteBlog(id);
            return ResponseEntity.status(HttpStatus.OK).body("Blog has been deleted");
        }
    }
}
