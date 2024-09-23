package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.product.CreateProductData;
import com.coffee.lowland.DTO.request.product.CreateProductDetails;
import com.coffee.lowland.DTO.request.product.CreateProductRecipe;
import com.coffee.lowland.DTO.response.product.ProductDetailsResponse;
import com.coffee.lowland.DTO.response.product.ProductImageResponse;
import com.coffee.lowland.DTO.response.product.ProductResponse;
import com.coffee.lowland.DTO.response.utilities.APIResponse;
import com.coffee.lowland.DTO.response.utilities.PageServiceResponse;
import com.coffee.lowland.model.ProductImage;
import com.coffee.lowland.service.Product.ProductDetailsService;
import com.coffee.lowland.service.Product.ProductImageService;
import com.coffee.lowland.service.Product.ProductService;
import com.coffee.lowland.service.Utilities.JSONMapper;
import com.coffee.lowland.service.Utilities.ObjectValidator;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ProductController {
    ProductService _service;
    ProductImageService productImageService;
    ProductDetailsService productDetailsService;
    JSONMapper jsonMapper;
    ObjectValidator objectValidator;

    @GetMapping
    public APIResponse<PageServiceResponse<ProductResponse>> getProductPage(
            @RequestParam(required = false, defaultValue = "1") int page,
            @RequestParam(required = false, defaultValue = "10") int size,
            @RequestParam(required = false, defaultValue = "") String query,
            @RequestParam(required = false, defaultValue = "") Boolean isActive,
            @RequestParam(required = false, defaultValue = "") String productTypeId,
            @RequestParam(required = false, defaultValue = "product_id") String sortedBy,
            @RequestParam(required = false, defaultValue = "DESC") String sortDirection){
        return APIResponse.<PageServiceResponse<ProductResponse>>builder()
                .code(2000)
                .result(_service.getProductPage(page,size,query,
                        isActive,productTypeId, sortedBy,sortDirection))
                .build();
    }

    @GetMapping("/{product_id}")
    public APIResponse<ProductDetailsResponse> getProductDetails(@PathVariable String product_id) {
        return APIResponse.<ProductDetailsResponse>builder()
                .code(2000)
                .result(_service.getProductDetails(product_id))
                .build();
    }

    @PostMapping
    public APIResponse<ProductDetailsResponse> createNewProduct(@RequestParam MultipartFile[] images
            ,@RequestParam String recipes
            ,@RequestParam String details
            ,@RequestParam String productData) throws IOException {
        // convert to object
        CreateProductData data = jsonMapper.JSONToObject(productData, CreateProductData.class);
        CreateProductDetails[] productDetails = jsonMapper.JSONToObject(details, CreateProductDetails[].class);
        CreateProductRecipe[] productRecipe = jsonMapper.JSONToObject(recipes, CreateProductRecipe[].class);
        // validate
        objectValidator.validateObject(data);
        for(CreateProductDetails item : productDetails) objectValidator.validateObject(item);
        for(CreateProductRecipe item : productRecipe) objectValidator.validateObject(item);
        return APIResponse.<ProductDetailsResponse>builder()
                .code(2000)
                .result(_service.createProduct(data, productDetails, productRecipe, images))
                .build();
    }

    @PutMapping("/{productId}")
    public APIResponse<ProductDetailsResponse> updateProduct(
            @RequestParam(required = false) MultipartFile[] images,
            @RequestParam(required = false) String recipes,
            @RequestParam(required = false) String details,
            @RequestParam(required = false) String productData,
            @PathVariable String productId) throws IOException {
        CreateProductData data = null;
        CreateProductDetails[] productDetails = null;
        CreateProductRecipe[] productRecipe = null;
        if (productData != null) {
            data = jsonMapper.JSONToObject(productData, CreateProductData.class);
            objectValidator.validateObject(data);
        }
        if (details != null) {
            productDetails = jsonMapper.JSONToObject(details, CreateProductDetails[].class);
            for (CreateProductDetails item : productDetails) objectValidator.validateObject(item);
        }
        if (recipes != null) {
            productRecipe = jsonMapper.JSONToObject(recipes, CreateProductRecipe[].class);
            for (CreateProductRecipe item : productRecipe) objectValidator.validateObject(item);
        }
        return APIResponse.<ProductDetailsResponse>builder()
                .code(2000)
                .result(_service.updateProduct(productId, data, productDetails, productRecipe, images))
                .build();
    }

    // product sizes and prices
    @DeleteMapping("/{productId}/sizesAndPrices/{detailsId}")
    public APIResponse<Boolean> deleteSizeAndPrice(@PathVariable String productId
            , @PathVariable String detailsId) {
        return APIResponse.<Boolean>builder()
                .code(2000)
                .result(productDetailsService.deleteDetailsById(productId,detailsId))
                .build();
    }

    // product images
    @GetMapping("/{productId}/images")
    public APIResponse<List<ProductImageResponse>> getProductImagesByProductId(@PathVariable String productId) {
        return APIResponse.<List<ProductImageResponse>>builder()
                .code(2000)
                .result(productImageService.getProductImages(productId))
                .build();
    }

    @PostMapping("/{productId}/images")
    public APIResponse<List<ProductImage>> uploadProductImage(@RequestParam MultipartFile[] images,
                                                              @PathVariable String productId) throws IOException {
        return APIResponse.<List<ProductImage>>builder()
                .code(2000)
                .result(productImageService.createProductImages(images,productId))
                .build();
    }

    @DeleteMapping("/{productId}/images/{productImageId}")
    public APIResponse<Boolean> deleteProductImage(@PathVariable String productImageId,
                                                   @PathVariable String productId) throws IOException {
        return APIResponse.<Boolean>builder()
                .code(2000)
                .result(productImageService.deleteProductImage(productId,productImageId))
                .message("Deleted success!")
                .build();
    }
}
