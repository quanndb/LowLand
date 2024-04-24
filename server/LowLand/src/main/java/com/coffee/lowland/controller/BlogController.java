package com.coffee.lowland.controller;

import com.coffee.lowland.model.Blog;
import com.coffee.lowland.model.ResponseObject;
import com.coffee.lowland.repository.BlogRepository;
import com.coffee.lowland.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("v1/admin/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;
    @Autowired
    private BlogRepository blogRepository;

    @GetMapping("/")
    public ResponseEntity<ResponseObject> getBlogs(@RequestParam int page, @RequestParam int size){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("ok","ok",blogService.getBlogs(page,size).get()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getBlog(@PathVariable int id){
        List<Blog> exitstBlog = blogService.getBlog(id);
        if(exitstBlog.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("Fail","Not found blog", null));
        }
        else return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Success","Blog has been saved", exitstBlog.get(0)));
    }

    @PostMapping("/")
    public ResponseEntity<Blog> postBlog(@RequestBody Blog newBlog){
        return ResponseEntity.status(HttpStatus.CREATED).body(blogService.postBlog(newBlog));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateBlog(@PathVariable int id, @RequestBody Blog newBlog){
        List<Blog> existBlog = blogRepository.findBlogById(id);
        if(existBlog.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found the blog");
        }
        else {
            existBlog.get(0).setTitle(newBlog.getTitle());
            existBlog.get(0).setContent(newBlog.getContent());
            existBlog.get(0).setDate((new Date()).toString());
            blogRepository.save(existBlog.get(0));
            return ResponseEntity.status(HttpStatus.OK).body("Update blog successfully");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBlog(@PathVariable int id){
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