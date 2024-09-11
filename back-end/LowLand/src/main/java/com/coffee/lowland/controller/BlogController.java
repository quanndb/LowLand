package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.blog.CreateBlogRequest;
import com.coffee.lowland.DTO.response.utilities.APIResponse;
import com.coffee.lowland.service.Blog.BlogService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/blogs")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class BlogController {

    BlogService blogService;

    @GetMapping
    public APIResponse<?> getBlogs(@RequestParam(required = false, defaultValue = "1") int page,
                                   @RequestParam(required = false, defaultValue = "10") int size,
                                   @RequestParam(required = false, defaultValue = "date") String sortedBy,
                                   @RequestParam(required = false, defaultValue = "DESC") String sortDirection,
                                   @RequestParam(required = false, defaultValue = "") String query,
                                   @RequestParam(required = false, defaultValue = "") String accountId,
                                   @RequestParam(required = false, defaultValue = "") String categoryId,
                                   @RequestParam(required = false) Boolean isActive){
        return APIResponse.builder()
                .code(2000)
                .result(blogService.getBlogs(page,size,query,sortedBy,sortDirection,accountId,categoryId,isActive))
                .build();
    }

    @PostMapping
    public APIResponse<?> createBlog(@RequestBody CreateBlogRequest req){
        return APIResponse.builder()
                .code(2000)
                .result(blogService.createBlog(req))
                .build();
    }

    @PutMapping("/{blogId}")
    public APIResponse<?> updateBlog(@RequestBody CreateBlogRequest req, @PathVariable String blogId){
        return APIResponse.builder()
                .code(2000)
                .result(blogService.updateBlog(blogId, req))
                .build();
    }

    @GetMapping("/{blogId}")
    public APIResponse<?> getDetails(@PathVariable String blogId){
        return APIResponse.builder()
                .code(2000)
                .result(blogService.getDetails(blogId))
                .build();
    }
}
