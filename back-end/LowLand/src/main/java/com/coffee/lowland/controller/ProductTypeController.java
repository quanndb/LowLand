package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.productType.ProductTypeDto;
import com.coffee.lowland.DTO.response.utilities.APIResponse;

import com.coffee.lowland.model.ProductType;
import com.coffee.lowland.service.Product.ProductTypeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/productTypes")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ProductTypeController {
    ProductTypeService _service;

    @GetMapping("")
    public APIResponse<List<ProductType>> getTypes(@RequestParam(required = false, defaultValue = "") String query,
                                                   @RequestParam(required = false) Integer size){
        return APIResponse.<List<ProductType>>builder()
                .code(2000)
                .result(_service.getAllProductType(query, size))
                .build();
    }

    @GetMapping("/{typeId}")
    public APIResponse<ProductType> getByTypeId(@PathVariable String typeId){
        return APIResponse.<ProductType>builder()
                .code(2000)
                .result(_service.getProductTypeById(typeId))
                .build();
    }

    @PostMapping("")
    public APIResponse<ProductType> create(@RequestBody ProductTypeDto data) {
        return APIResponse.<ProductType>builder()
                .code(2000)
                .message("Change success!")
                .result(_service.createNewType(data))
                .build();
    }

    @PutMapping("")
    public APIResponse<ProductType> update(@RequestBody ProductType data) {
        return APIResponse.<ProductType>builder()
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
