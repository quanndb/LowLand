package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.ProductDetailsDTO;
import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.DTO.response.ProductDetailResponse;
import com.coffee.lowland.model.Product;
import com.coffee.lowland.model.ProductImage;
import com.coffee.lowland.model.ProductRecipe;
import com.coffee.lowland.service.ProductDetailsService;
import com.coffee.lowland.service.ProductImageService;
import com.coffee.lowland.service.ProductRecipeService;
import com.coffee.lowland.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ProductDetail")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ProductDetailsController {
    ProductDetailsService _service;
    ProductService _productService;
    ProductImageService _imageService;
    ProductRecipeService _recipeService;

    @GetMapping("/GetAllByProductId")
    public APIResponse<Object> GetAll(@RequestParam int ProductId) throws IOException {
        ProductDetailsDTO data = new ProductDetailsDTO();
        Optional<Product> product = _productService.GetByProductId(ProductId);
        List<ProductDetailResponse> details = _service.GetAll(ProductId);
        List<ProductImage> images  = _imageService.getProductImages(ProductId);
        List<ProductRecipe> listRecipe = _recipeService.GetAllByProductId(ProductId);

        data.setProduct(product);
        data.setDetails(details);
        data.setImages(images);
        data.setListRecipe(listRecipe);
        return APIResponse.<Object>builder()
                .code(2000)
                .result(data)
                .build();
    }
}
