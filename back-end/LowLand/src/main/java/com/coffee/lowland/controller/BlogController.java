package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.blog.*;
import com.coffee.lowland.DTO.response.blog.BlogDetails;
import com.coffee.lowland.DTO.response.blog.Blogs;
import com.coffee.lowland.DTO.response.blog.CommentsResponse;
import com.coffee.lowland.DTO.response.blog.PostCommentResponse;
import com.coffee.lowland.DTO.response.utilities.APIResponse;
import com.coffee.lowland.DTO.response.utilities.PageServiceResponse;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.Blog;
import com.coffee.lowland.model.Comment;
import com.coffee.lowland.service.Blog.BlogService;
import com.coffee.lowland.service.Blog.InteractService;
import com.coffee.lowland.service.Utilities.JSONMapper;
import com.coffee.lowland.service.Utilities.ObjectValidator;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@RequestMapping("/blogs")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class BlogController {

    BlogService blogService;
    InteractService interactService;
    JSONMapper jsonMapper;
    ObjectValidator objectValidator;

    @GetMapping
    public APIResponse<PageServiceResponse<Blogs>> getBlogs(@RequestParam(required = false, defaultValue = "1") int page,
                                                            @RequestParam(required = false, defaultValue = "10") int size,
                                                            @RequestParam(required = false, defaultValue = "date") String sortedBy,
                                                            @RequestParam(required = false, defaultValue = "DESC") String sortDirection,
                                                            @RequestParam(required = false, defaultValue = "") String query,
                                                            @RequestParam(required = false, defaultValue = "") String accountId,
                                                            @RequestParam(required = false, defaultValue = "") String categoryName,
                                                            @RequestParam(required = false) Boolean isActive){
        return APIResponse.<PageServiceResponse<Blogs>> builder()
                .code(2000)
                .result(blogService.getBlogs(page,size,query,sortedBy,sortDirection,accountId,categoryName,isActive))
                .build();
    }

    @PostMapping
    public APIResponse<Blog> createBlog(@RequestParam(required = false) String request,
                                        @RequestParam(required = false) List<MultipartFile> images) throws IOException, NoSuchAlgorithmException {
        CreateNewBlogRequest req = null;
        if(request != null){
            req = jsonMapper.JSONToObject(request, CreateNewBlogRequest.class);
            objectValidator.validateObject(req);
        }
        return APIResponse.<Blog>builder()
                .code(2000)
                .result(blogService.createBlog(req, images))
                .build();
    }

    @PutMapping("/{blogId}")
    public APIResponse<Blog> updateBlog(@PathVariable String blogId,
                                     @RequestParam(required = false) String request,
                                     @RequestParam(required = false) List<MultipartFile> images) throws IOException, NoSuchAlgorithmException {
        CreateNewBlogRequest req = null;
        if(request != null){
            req = jsonMapper.JSONToObject(request, CreateNewBlogRequest.class);
            objectValidator.validateObject(req);
        }
        return APIResponse.<Blog>builder()
                .code(2000)
                .result(blogService.updateBlog(blogId, req, images))
                .build();
    }

    @DeleteMapping("/{blogId}")
    public APIResponse<String> deleteBlog(@PathVariable String blogId) throws IOException {
        return APIResponse.<String>builder()
                .code(2000)
                .result(blogService.deleteBLog(blogId))
                .build();
    }

    @GetMapping("/{blogId}")
    public APIResponse<BlogDetails> getDetails(@PathVariable String blogId){
        return APIResponse.<BlogDetails>builder()
                .code(2000)
                .result(blogService.getDetails(blogId))
                .build();
    }

    //    interact
    @GetMapping("/{blogId}/interactions")
    public APIResponse<String> getLikesAndTotal(@PathVariable String blogId){
        if(!blogService.isExitsBlog(blogId))
            throw new AppExceptions(ErrorCode.BLOG_NOT_FOUND);
        return APIResponse.<String>builder()
            .code(2000)
            .result(interactService.getLikedAndTotalOfBlog(blogId))
            .build();
    }
    //    likes
    @PostMapping("/{blogId}/likes")
    public APIResponse<String> changeLikeStatusOfBlog(@PathVariable String blogId){
        if(!blogService.isExitsBlog(blogId))
            throw new AppExceptions(ErrorCode.BLOG_NOT_FOUND);
        return APIResponse.<String>builder()
                .code(2000)
                .result(interactService.changeLikeBlog(blogId))
                .build();
    }
    @PostMapping("/{blogId}/comments/{commentId}/likes")
    public APIResponse<String>changeLikeStatusOfComment(@PathVariable String blogId,
                                                    @PathVariable String commentId,
                                                    @RequestParam(required = false) String parentsId){
        if(!blogService.isExitsBlog(blogId))
            throw new AppExceptions(ErrorCode.BLOG_NOT_FOUND);
        return APIResponse.<String>builder()
                .code(2000)
                .result(interactService.changeLikeComment(blogId, commentId,parentsId))
                .build();
    }

    //    comments
    @GetMapping("/{blogId}/comments")
    public APIResponse<PageServiceResponse<CommentsResponse>> getCommentsPage(@PathVariable String blogId,
                                                                              @RequestParam(required = false, defaultValue = "1") int page,
                                                                              @RequestParam(required = false, defaultValue = "10") int size,
                                                                              @RequestParam(required = false, defaultValue = "") String query,
                                                                              @RequestParam(required = false, defaultValue = "commentedDate") String sortedBy,
                                                                              @RequestParam(required = false, defaultValue = "DESC") String sortDirection,
                                                                              @RequestParam(required = false, defaultValue = "") String accountId){
        if(!blogService.isExitsBlog(blogId))
            throw new AppExceptions(ErrorCode.BLOG_NOT_FOUND);
        return APIResponse.<PageServiceResponse<CommentsResponse>>builder()
            .code(2000)
            .result(interactService.getCommentsPage(blogId,null, page, size, query,
                                                sortedBy, sortDirection, accountId))
            .build();
    }

    @PostMapping("/{blogId}/comments")
    public APIResponse<PostCommentResponse> postComment(@PathVariable String blogId, @RequestBody @Valid CommentBlog content){
        if(!blogService.isExitsBlog(blogId))
            throw new AppExceptions(ErrorCode.BLOG_NOT_FOUND);
        return APIResponse.<PostCommentResponse>builder()
                .code(2000)
                .result(interactService.commentBlog(blogId, content))
                .build();
    }

    @PutMapping("/{blogId}/comments/{commentId}")
    public APIResponse<Comment> updateComment(@PathVariable String blogId,
                                              @PathVariable String commentId,
                                              @RequestBody @Valid CommentAResponse content){
        if(!blogService.isExitsBlog(blogId))
            throw new AppExceptions(ErrorCode.BLOG_NOT_FOUND);
        return APIResponse.<Comment>builder()
                .code(2000)
                .result(interactService.updateComment(commentId, content))
                .build();
    }

    @DeleteMapping("/{blogId}/comments/{commentId}")
    public APIResponse<String> deleteComment(@PathVariable String blogId,
                                        @PathVariable String commentId){
        if(!blogService.isExitsBlog(blogId))
            throw new AppExceptions(ErrorCode.BLOG_NOT_FOUND);
        return APIResponse.<String>builder()
                .code(2000)
                .result(interactService.deleteComment(commentId))
                .build();
    }

    @GetMapping("/{blogId}/comments/{parentsId}/replies")
    public APIResponse<PageServiceResponse<CommentsResponse>> getCommentsPageOfResponse(@PathVariable String parentsId,
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
        return APIResponse.<PageServiceResponse<CommentsResponse>>builder()
                .code(2000)
                .result(interactService.getCommentsPage(blogId,parentsId, page, size, query,
                        sortedBy, sortDirection, accountId))
                .build();
    }

    @PostMapping("/{blogId}/comments/{parentsId}/replies/{commentId}")
    public APIResponse<PostCommentResponse> postCommentResponse(@PathVariable String blogId,
                                              @PathVariable String parentsId,
                                              @PathVariable String commentId,
                                              @RequestBody @Valid CommentAResponse content){
        if(!interactService.isExistsComment(parentsId))
            throw new AppExceptions(ErrorCode.COMMENT_NOT_FOUND);
        if(!interactService.isExistsComment(commentId))
            throw new AppExceptions(ErrorCode.COMMENT_NOT_FOUND);
        return APIResponse.<PostCommentResponse>builder()
                .code(2000)
                .result(interactService.commentResponse(blogId, parentsId, commentId, content))
                .build();
    }
}
