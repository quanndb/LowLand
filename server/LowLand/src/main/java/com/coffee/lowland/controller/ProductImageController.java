package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.product.ProductDataDto;
import com.coffee.lowland.DTO.request.productImage.ProductImageRequest;
import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.model.Product;
import com.coffee.lowland.model.ProductImage;
import com.coffee.lowland.service.ProductImageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ProductImage")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ProductImageController {
    ProductImageService _service;
    @GetMapping("/GetById")
    public APIResponse<Object> GetById(@RequestParam int ProductId) throws IOException {
        List<ProductImage> data = _service.getProductImages(ProductId);
        return APIResponse.<Object>builder()
                .code(2000)
                .result(data)
                .build();
    }

    @PostMapping("/Create")
    public APIResponse<Boolean> CreateOrUpdate(@RequestBody ProductImageRequest data) throws IOException {
        _service.CreateProductImage(data.getImageBase64(),data.getProductId());
        return APIResponse.<Boolean>builder()
                .code(2000)
                .message("Change success!")
                .result(true).build();
    }

    @GetMapping("/Delete")
    public APIResponse<Boolean> Delete(@RequestParam int Id) throws IOException {
        return APIResponse.<Boolean>builder()
                .code(2000)
                .result(_service.DeleteImage(Id))
                .message("Deleted success!")
                .build();
    }
}
