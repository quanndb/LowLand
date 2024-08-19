package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.service.Product.ProductImageService;
import com.coffee.lowland.service.Product.ProductService;
import jakarta.validation.constraints.Null;
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
    ProductImageService productImageService;

    @GetMapping
    public APIResponse<?> getProductPage(
            @RequestParam(required = false, defaultValue = "1") int page,
            @RequestParam(required = false, defaultValue = "10") int size,
            @RequestParam(required = false, defaultValue = "") String query,
            @RequestParam(required = false, defaultValue = "") Boolean isActive,
            @RequestParam(required = false, defaultValue = "") String productTypeId,
            @RequestParam(required = false, defaultValue = "product_id") String sortedBy,
            @RequestParam(required = false, defaultValue = "DESC") String sortDirection){
        return APIResponse.builder()
                .code(2000)
                .result(_service.getProductPage(page,size,query,
                        isActive,productTypeId, sortedBy,sortDirection))
                .build();
    }

    @GetMapping("/{product_id}")
    public APIResponse<?> getProductDetails(@PathVariable String product_id) throws IOException {
        return APIResponse.builder()
                .code(2000)
                .result(_service.getProductDetails(product_id))
                .build();
    }



    // product images
    @GetMapping("/{productId}/images")
    public APIResponse<Object> getProductImagesByProductId(@PathVariable String productId) throws IOException {
        return APIResponse.<Object>builder()
                .code(2000)
                .result(productImageService.getProductImages(productId))
                .build();
    }

    @PostMapping("/{productId}/images")
    public APIResponse<?> uploadProductImage(@RequestParam MultipartFile image,
                                             @PathVariable String productId) throws IOException {
        return APIResponse.builder()
                .code(2000)
                .result(productImageService.createProductImage(image,productId))
                .build();
    }

    @DeleteMapping("/images/{productImageId}")
    public APIResponse<Boolean> deleteProductImage(@PathVariable String productImageId) throws IOException {
        return APIResponse.<Boolean>builder()
                .code(2000)
                .result(productImageService.deleteProductImage(productImageId))
                .message("Deleted success!")
                .build();
    }
}
