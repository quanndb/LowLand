package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.productType.ProductSizeDto;
import com.coffee.lowland.DTO.request.productType.ProductTypeDto;
import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.DTO.response.ProductTypeResponse;
import com.coffee.lowland.model.ProductSize;
import com.coffee.lowland.model.ProductType;
import com.coffee.lowland.repository.ProductSizeRepository;
import com.coffee.lowland.service.ProductSizeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ProductSize")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ProductSizeController {
    ProductSizeService _service;

    @GetMapping("/GetAll")
    public APIResponse<Object> GetAll(@RequestParam String keyWords){
        List<ProductSize> data = _service.GetAll(keyWords);
        return APIResponse.<Object>builder()
                .code(2000)
                .result(data)
                .build();
    }
    @GetMapping("/GetById")
    public APIResponse<Object> GetById(@RequestParam String Id){
        Optional<ProductSize> data = _service.GetById(Id);
        return APIResponse.<Object>builder()
                .code(2000)
                .result(data)
                .build();
    }
    @PostMapping("/CreateOrUpdate")
    public APIResponse<?> CreateOrUpdate(@RequestBody ProductSizeDto data) {
        return APIResponse.builder()
                .code(2000)
                .message("Change success!")
                .result(_service.CreateOrUpdate(data)).build();
    }


    @GetMapping("/Delete")
    public APIResponse<Boolean> Delete(@RequestParam String id){
        return APIResponse.<Boolean>builder()
                .code(2000)
                .result(_service.Delete(id))
                .message("Deleted success!")
                .build();
    }
}
