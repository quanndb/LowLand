package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.blog.CommentAResponse;
import com.coffee.lowland.DTO.request.blog.CommentBlog;
import com.coffee.lowland.DTO.request.blog.CreateBlogRequest;
import com.coffee.lowland.DTO.response.utilities.APIResponse;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.service.Blog.BlogService;
import com.coffee.lowland.service.Blog.InteractService;
import jakarta.validation.Valid;
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
    InteractService interactService;

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

    //    interact
    @GetMapping("/{blogId}/interactions")
    public APIResponse<?> getLikesAndTotal(@PathVariable String blogId){
        if(!blogService.isExitsBlog(blogId))
            throw new AppExceptions(ErrorCode.BLOG_NOT_FOUND);
        return APIResponse.builder()
            .code(2000)
            .result(interactService.getLikedAndTotalOfBlog(blogId))
            .build();
    }
    //    likes
    @PostMapping("/{blogId}/likes")
    public APIResponse<?> changeLikeStatusOfBlog(@PathVariable String blogId){
        if(!blogService.isExitsBlog(blogId))
            throw new AppExceptions(ErrorCode.BLOG_NOT_FOUND);
        return APIResponse.builder()
                .code(2000)
                .result(interactService.changeLikeBlog(blogId))
                .build();
    }
    @PostMapping("/{blogId}/comments/{commentId}/likes")
    public APIResponse<?> changeLikeStatusOfComment(@PathVariable String blogId,
                                                    @PathVariable String commentId){
        if(!blogService.isExitsBlog(blogId))
            throw new AppExceptions(ErrorCode.BLOG_NOT_FOUND);
        return APIResponse.builder()
                .code(2000)
                .result(interactService.changeLikeComment(commentId))
                .build();
    }

    //    comments
    @GetMapping("/{blogId}/comments")
    public APIResponse<?> getCommentsPage(@PathVariable String blogId,
                                          @RequestParam(required = false, defaultValue = "1") int page,
                                          @RequestParam(required = false, defaultValue = "10") int size,
                                          @RequestParam(required = false, defaultValue = "") String query,
                                          @RequestParam(required = false, defaultValue = "commentedDate") String sortedBy,
                                          @RequestParam(required = false, defaultValue = "DESC") String sortDirection,
                                          @RequestParam(required = false, defaultValue = "") String accountId){
        if(!blogService.isExitsBlog(blogId))
            throw new AppExceptions(ErrorCode.BLOG_NOT_FOUND);
        return APIResponse.builder()
            .code(2000)
            .result(interactService.getCommentsPage(blogId,null, page, size, query,
                                                sortedBy, sortDirection, accountId))
            .build();
    }

    @PostMapping("/{blogId}/comments")
    public APIResponse<?> postComment(@PathVariable String blogId,@RequestBody @Valid CommentBlog content){
        if(!blogService.isExitsBlog(blogId))
            throw new AppExceptions(ErrorCode.BLOG_NOT_FOUND);
        return APIResponse.builder()
                .code(2000)
                .result(interactService.commentBlog(blogId, content))
                .build();
    }

    @GetMapping("/{blogId}/comments/{parentsId}/replies")
    public APIResponse<?> getCommentsPageOfResponse(@PathVariable String parentsId,
                                                    @PathVariable String blogId,
                                                    @RequestParam(required = false, defaultValue = "1") int page,
                                                    @RequestParam(required = false, defaultValue = "10") int size,
                                                    @RequestParam(required = false, defaultValue = "") String query,
                                                    @RequestParam(required = false, defaultValue = "commentedDate") String sortedBy,
                                                    @RequestParam(required = false, defaultValue = "DESC") String sortDirection,
                                                    @RequestParam(required = false, defaultValue = "") String accountId){
        if(!blogService.isExitsBlog(blogId))
            throw new AppExceptions(ErrorCode.BLOG_NOT_FOUND);
        if(!interactService.isExistsComment(parentsId))
            throw new AppExceptions(ErrorCode.COMMENT_NOT_FOUND);
        return APIResponse.builder()
                .code(2000)
                .result(interactService.getCommentsPage(blogId,parentsId, page, size, query,
                        sortedBy, sortDirection, accountId))
                .build();
    }

    @PostMapping("/{blogId}/comments/{parentsId}/replies/{commentId}")
    public APIResponse<?> postCommentResponse(@PathVariable String blogId,
                                              @PathVariable String parentsId,
                                              @PathVariable String commentId,
                                              @RequestBody @Valid CommentAResponse content){
        if(!interactService.isExistsComment(parentsId))
            throw new AppExceptions(ErrorCode.COMMENT_NOT_FOUND);
        if(!interactService.isExistsComment(commentId))
            throw new AppExceptions(ErrorCode.COMMENT_NOT_FOUND);
        return APIResponse.builder()
                .code(2000)
                .result(interactService.commentResponse(blogId, parentsId, commentId, content))
                .build();
    }
}
