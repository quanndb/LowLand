package com.coffee.lowland.service.Product;

import com.coffee.lowland.DTO.response.PageServiceResponse;
import com.coffee.lowland.DTO.response.ProductDetailResponse;
import com.coffee.lowland.DTO.response.product.ProductDetailsResponse;
import com.coffee.lowland.DTO.response.product.ProductImageResponse;
import com.coffee.lowland.DTO.response.product.ProductRecipeDetailsResponse;
import com.coffee.lowland.DTO.response.product.ProductResponse;
import com.coffee.lowland.JPA.repository.ProductRepository;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.Product;
import com.coffee.lowland.model.ProductImage;
import com.coffee.lowland.service.Utilities.PageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ProductService {
    ProductRepository _repo;
    ProductImageService productImageService;
    ProductRecipeService productRecipeService;
    ProductTypeService productTypeService;
    ProductDetailsService productDetailsService;
    PageService<ProductResponse> productPageService;

    public PageServiceResponse<ProductResponse> getProductPage(int page, int size, String query, Boolean isActive, String productTypeId, String sortedBy, String sortDirection) {
        return productPageService.pageResponse("spGetProductsByPage",ProductResponse.class,
                page,size,query,isActive,productTypeId,
                sortedBy,sortDirection);
    }

    public ProductDetailsResponse getProductDetails(String productId) throws IOException {
        Product foundProduct = _repo.findById(productId)
                .orElseThrow(()-> new AppExceptions(ErrorCode.PRODUCT_NOT_FOUND));

        List<ProductImageResponse> images = productImageService.getProductImages(productId);
        List<ProductRecipeDetailsResponse> recipes = productRecipeService.getAllByProductId(productId);
        List<ProductDetailResponse> sizesAndPrices = productDetailsService.getProductSizeAndPrice(productId);
        String typeName = productTypeService.getProductTypeById(foundProduct.getProductTypeId()).getTypeName();
        return ProductDetailsResponse.builder()
                .productId(foundProduct.getProductId())
                .productName(foundProduct.getProductName())
                .description(foundProduct.getDescription())
                .isActive(foundProduct.isActive())
                .typeName(typeName)
                .images(images)
                .recipes(recipes)
                .sizesAndPrices(sizesAndPrices)
                .build();
    }

//    public ProductResponse createProduct(MultipartFile[] images, String recipes, String details) {
//
//    }
}
