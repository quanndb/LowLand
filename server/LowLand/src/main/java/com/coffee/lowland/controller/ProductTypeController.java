package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.AuthenticationRequest;
import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.DTO.response.AuthenticationResponse;

import com.coffee.lowland.DTO.response.ProductTypeResponse;
import com.coffee.lowland.DTO.response.UserResponse;
import com.coffee.lowland.model.Account;
import com.coffee.lowland.model.ProductType;
import com.coffee.lowland.service.AuthenticationService;
import com.coffee.lowland.service.ProductTypeService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/ProductType")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ProductTypeController {
    ProductTypeService _service;

    @GetMapping("/GetAll")
    public APIResponse<ProductTypeResponse> GetAll(@RequestParam String keyWords, @RequestParam int pageNumber){
        ProductTypeResponse data = new ProductTypeResponse();
        data.data = _service.GetAll(keyWords, pageNumber);
        data.pagination = _service.GetTotalPage(keyWords);

        return APIResponse.<ProductTypeResponse>builder()
                .code(2000)
                .result(data)
                .build()
                ;
    }

    @PostMapping("/CreateOrUpdate")
    public APIResponse<ProductType> CreateOrUpdate(@RequestBody ProductType data) {
        ProductType model = _service.CreateOrUpdate(data);
        return APIResponse.<ProductType>builder().code(2000).result(model).build();
    }


    @GetMapping("/Delete")
    public APIResponse<ProductType> Delete(@PathVariable int id){
        ProductType data = new ProductType();
        _service.Delete(id);
        return APIResponse.<ProductType>builder()
                .code(2000)
                .result(data)
                .build();
    }
}
