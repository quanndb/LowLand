package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.productType.ProductSizeDto;
import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.model.ProductSize;
import com.coffee.lowland.service.Product.ProductSizeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/productSize")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ProductSizeController {
    ProductSizeService _service;

    @GetMapping("")
    public APIResponse<?> getAll(@RequestParam String keyWords){
        return APIResponse.builder()
                .code(2000)
                .result(_service.getAllSize(keyWords))
                .build();
    }
    @GetMapping("/{sizeId}")
    public APIResponse<?> getById(@PathVariable String sizeId){
        return APIResponse.builder()
                .code(2000)
                .result(_service.getById(sizeId))
                .build();
    }
    @PostMapping("")
    public APIResponse<?> createSize(@RequestBody ProductSizeDto data) {
        return APIResponse.builder()
                .code(2000)
                .message("Change success!")
                .result(_service.createSize(data))
                .build();
    }

    @PutMapping("")
    public APIResponse<?> updateSize(@RequestBody ProductSize data) {
        return APIResponse.builder()
                .code(2000)
                .message("Change success!")
                .result(_service.updateSize(data))
                .build();
    }

    @DeleteMapping("/{sizeId}")
    public APIResponse<Boolean> deleteSize(@PathVariable String sizeId){
        return APIResponse.<Boolean>builder()
                .code(2000)
                .result(_service.deleteById(sizeId))
                .message("Deleted success!")
                .build();
    }
}
