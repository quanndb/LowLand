package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.productType.ProductTypeDto;
import com.coffee.lowland.DTO.response.APIResponse;

import com.coffee.lowland.model.ProductType;
import com.coffee.lowland.service.Product.ProductTypeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/product-types")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ProductTypeController {
    ProductTypeService _service;

    @GetMapping("")
    public APIResponse<?> getAll(@RequestParam(required = false, defaultValue = "") String query){
        return APIResponse.builder()
                .code(2000)
                .result(_service.getAllProductType(query))
                .build();
    }

    @GetMapping("/{typeId}")
    public APIResponse<?> getByTypeId(@PathVariable String typeId){
        return APIResponse.builder()
                .code(2000)
                .result(_service.getProductTypeById(typeId))
                .build();
    }

    @PostMapping("")
    public APIResponse<?> create(@RequestBody ProductTypeDto data) {
        return APIResponse.builder()
                .code(2000)
                .message("Change success!")
                .result(_service.createNewType(data))
                .build();
    }

    @PutMapping("")
    public APIResponse<?> update(@RequestBody ProductType data) {
        return APIResponse.builder()
                .code(2000)
                .message("Change success!")
                .result(_service.updateType(data))
                .build();
    }

    @DeleteMapping("/{typeId}")
    public APIResponse<Boolean> deleteType(@PathVariable String typeId){
        return APIResponse.<Boolean>builder()
                .code(2000)
                .result(_service.deleteProductTypeById(typeId))
                .message("Deleted success!")
                .build();
    }
}
