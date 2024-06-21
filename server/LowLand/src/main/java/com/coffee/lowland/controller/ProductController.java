package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.product.ProductDataDto;
import com.coffee.lowland.DTO.request.product.ProductDto;
import com.coffee.lowland.DTO.request.productType.ProductSizeDto;
import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.DTO.response.product.ProductRespone;
import com.coffee.lowland.model.Product;
import com.coffee.lowland.model.ProductSize;
import com.coffee.lowland.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Product")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ProductController {
    ProductService _service;

    @GetMapping("/GetAll")
    public APIResponse<Object> GetAll(@RequestParam int ProductId, @RequestParam int inputRow){
        return APIResponse.<Object>builder()
                .code(2000)
                .result(_service.GetAll(ProductId, inputRow))
                .build();
    }
    @GetMapping("/GetById")
    public APIResponse<Object> GetById(@RequestParam int Id){
        Optional<Product> data = _service.GetByProductId(Id);
        return APIResponse.<Object>builder()
                .code(2000)
                .result(data)
                .build();
    }
    @PostMapping("/CreateOrUpdate")
    public APIResponse<Boolean> CreateOrUpdate(@RequestBody ProductDataDto data) throws IOException {
        return APIResponse.<Boolean>builder()
                .code(2000)
                .message("Change success!")
                .result(_service.CreateOrUpdateProduct(data)).build();
    }


    @GetMapping("/Delete")
    public APIResponse<Boolean> Delete(@RequestParam int id){
        return APIResponse.<Boolean>builder()
                .code(2000)
                .result(_service.Delete(id))
                .message("Deleted success!")
                .build();
    }
}
