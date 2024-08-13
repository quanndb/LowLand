package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.service.Product.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

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

}
