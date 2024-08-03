package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.product.ProductDataDto;
import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.DTO.response.PageServiceResponse;
import com.coffee.lowland.model.Product;
import com.coffee.lowland.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ProductController {
    ProductService _service;

    @GetMapping("")
    public APIResponse<?> getProductPage(
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size,
            @RequestParam(required = false, defaultValue = "") String query,
            @RequestParam(required = false, defaultValue = "") String productId,
            @RequestParam(required = false, defaultValue = "") Boolean isActive,
            @RequestParam(required = false, defaultValue = "") String productTypeId){
        return APIResponse.builder()
                .code(2000)
                .result(_service.getProductPage(page,size,query,
                        productId,isActive,productTypeId))
                .build();
    }

    @PostMapping("/new-product")
    public APIResponse<Boolean> CreateOrUpdate(
            @RequestParam(required = false) MultipartFile[] images,
            @RequestParam(required = false) String recipes,
            @RequestParam(required = false) String details) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return APIResponse.<Boolean>builder()
                .code(2000)
                .message("Change success!")
                .result(_service
                        .CreateOrUpdateProduct(images, recipes, details))
                .build();
    }

    @PostMapping("/{productId}")
    public APIResponse<Boolean> updateProduct(@RequestBody ProductDataDto data) throws IOException {
        return APIResponse.<Boolean>builder()
                .code(2000)
                .message("Change success!")
                .result(_service.CreateOrUpdateProduct(data))
                .build();
    }

    @DeleteMapping("/{productId}")
    public APIResponse<?> Delete(@PathVariable String productId){
        _service.deleteProduct(productId);
        return APIResponse.builder()
                .code(2000)
                .message("Deleted success!")
                .build();
    }
}
