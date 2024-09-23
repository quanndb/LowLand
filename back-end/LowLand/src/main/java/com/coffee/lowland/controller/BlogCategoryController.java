package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.response.utilities.APIResponse;
import com.coffee.lowland.model.Category;
import com.coffee.lowland.service.Blog.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BlogCategoryController {

    CategoryService categoryService;

    @GetMapping
    public APIResponse<List<Category>> getCategories(@RequestParam(required = false, defaultValue = "") String query,
                                                     @RequestParam(required = false, defaultValue = "10") Integer size){
        return APIResponse.<List<Category>>builder()
                .code(2000)
                .result(categoryService.getCategories(query, size))
                .build();
    }
}
