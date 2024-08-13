package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.model.ProductImage;
import com.coffee.lowland.service.Product.ProductImageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/product-images")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ProductImageController {
    ProductImageService _service;
    @GetMapping("")
    public APIResponse<Object> getProductImagesByProductId(@RequestParam String productId) throws IOException {
        return APIResponse.<Object>builder()
                .code(2000)
                .result(_service.getProductImages(productId))
                .build();
    }

    @PostMapping("")
    public APIResponse<?> uploadProductImage(@RequestParam MultipartFile image,
                                             @RequestParam String productId) throws IOException {
        return APIResponse.builder()
                .code(2000)
                .result(_service.createProductImage(image,productId))
                .build();
    }

    @DeleteMapping("/{productImageId}")
    public APIResponse<Boolean> Delete(@PathVariable String productImageId) throws IOException {
        return APIResponse.<Boolean>builder()
                .code(2000)
                .result(_service.deleteProductImage(productImageId))
                .message("Deleted success!")
                .build();
    }
}
