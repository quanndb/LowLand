package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.productType.ProductSizeDto;
import com.coffee.lowland.DTO.response.utilities.APIResponse;
import com.coffee.lowland.model.ProductSize;
import com.coffee.lowland.service.Product.ProductSizeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productSizes")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ProductSizeController {
    ProductSizeService _service;

    @GetMapping("")
    public APIResponse<List<ProductSize>> getSizes(@RequestParam(required = false, defaultValue = "") String query,
                                                   @RequestParam(required = false) Integer size){
        return APIResponse.<List<ProductSize>>builder()
                .code(2000)
                .result(_service.getSizes(query, size))
                .build();
    }
    @GetMapping("/{sizeId}")
    public APIResponse<ProductSize> getById(@PathVariable String sizeId){
        return APIResponse.<ProductSize>builder()
                .code(2000)
                .result(_service.getById(sizeId))
                .build();
    }
    @PostMapping("")
    public APIResponse<ProductSize> createSize(@RequestBody ProductSizeDto data) {
        return APIResponse.<ProductSize>builder()
                .code(2000)
                .message("Change success!")
                .result(_service.createSize(data))
                .build();
    }

    @PutMapping("")
    public APIResponse<ProductSize> updateSize(@RequestBody ProductSize data) {
        return APIResponse.<ProductSize>builder()
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
