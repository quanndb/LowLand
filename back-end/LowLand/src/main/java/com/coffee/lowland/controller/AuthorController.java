package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.response.utilities.APIResponse;
import com.coffee.lowland.service.Account.AccountService;
import com.coffee.lowland.service.Blog.BlogService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/authors")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthorController {
    BlogService blogService;
    AccountService accountService;

    @GetMapping("/{authorId}")
    public APIResponse<?> getAuthorInfo(@PathVariable String authorId){
        return APIResponse.builder()
                .code(2000)
                .result(accountService.getInfoAfterAuthenticated(authorId))
                .build();
    }


    @GetMapping("/{authorId}/blogs")
    public APIResponse<?> getAuthorBlogs(@PathVariable String authorId,
                                         @RequestParam(required = false, defaultValue = "1") int page,
                                         @RequestParam(required = false, defaultValue = "10") int size,
                                         @RequestParam(required = false, defaultValue = "date") String sortedBy,
                                         @RequestParam(required = false, defaultValue = "DESC") String sortDirection,
                                         @RequestParam(required = false, defaultValue = "") String query,
                                         @RequestParam(required = false, defaultValue = "") String categoryId,
                                         @RequestParam(required = false) Boolean isActive){
        return APIResponse.builder()
                .code(2000)
                .result(blogService
                        .getAuthorBlogs(authorId,
                                page,size,query,sortedBy,sortDirection,
                                categoryId,isActive))
                .build();
    }
}
