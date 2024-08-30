package com.coffee.lowland.service.Product;

import com.coffee.lowland.DTO.request.product.CreateProductData;
import com.coffee.lowland.DTO.request.product.CreateProductDetails;
import com.coffee.lowland.DTO.request.product.CreateProductRecipe;
import com.coffee.lowland.DTO.response.utilities.PageServiceResponse;
import com.coffee.lowland.DTO.response.product.ProductDetailResponse;
import com.coffee.lowland.DTO.response.product.ProductDetailsResponse;
import com.coffee.lowland.DTO.response.product.ProductImageResponse;
import com.coffee.lowland.DTO.response.product.ProductRecipeDetailsResponse;
import com.coffee.lowland.DTO.response.product.ProductResponse;
import com.coffee.lowland.JPA.repository.ProductRepository;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.ProductMapper;
import com.coffee.lowland.model.*;
import com.coffee.lowland.service.Utilities.PageService;
import jakarta.persistence.StoredProcedureQuery;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductService {
    ProductRepository _repo;
    ProductImageService productImageService;
    ProductRecipeService productRecipeService;
    ProductTypeService productTypeService;
    ProductDetailsService productDetailsService;
    PageService<ProductResponse> productPageService;

    ProductMapper productMapper;

    @Transactional
    public PageServiceResponse<ProductResponse> getProductPage(int page, int size, String query, Boolean isActive, String productTypeId, String sortedBy, String sortDirection) {
        StoredProcedureQuery sp = productPageService.prepareStatement("spGetProductsByPage",ProductResponse.class,
                page,size,query,
                sortedBy,sortDirection);
        productPageService.addField(sp, "is_active", Boolean.class, isActive);
        productPageService.addField(sp, "type_id", String.class, productTypeId);
        return productPageService.pageResponse(sp);
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
                .isActive(foundProduct.getIsActive())
                .typeName(typeName)
                .images(images)
                .recipes(recipes)
                .sizesAndPrices(sizesAndPrices)
                .build();
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ProductDetailsResponse createProduct(
            CreateProductData data,
            CreateProductDetails[] details,
            CreateProductRecipe[] recipes,
            MultipartFile[] images) throws IOException {
        //type
        ProductType foundType = productTypeService.getOrCreateProductTypeByName(data.getType());
        //product
        Product newProduct = Product.builder()
                            .productTypeId(foundType.getProductTypeId())
                            .isActive(true)
                            .build();
        productMapper.createProduct(newProduct, data);
        Product res = _repo.save(newProduct);
        //product images
        productImageService.createProductImages(images, res.getProductId());
        //product size and price
        productDetailsService.createNewDetails(details, newProduct.getProductId());
        //product recipe
        productRecipeService.createNewRecipe(recipes, res.getProductId());

        return getProductDetails(newProduct.getProductId());
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public Object updateProduct(String productId,
                                CreateProductData data,
                                CreateProductDetails[] details,
                                CreateProductRecipe[] recipes,
                                MultipartFile[] images) throws IOException {
        if(data!=null){
            //type
            ProductType foundType = productTypeService.getOrCreateProductTypeByName(data.getType());
            //product
            Product foundProduct = _repo.findById(productId)
                    .orElseThrow(()->new AppExceptions(ErrorCode.PRODUCT_NOT_FOUND));
            foundProduct.setProductTypeId(foundType.getProductTypeId());
            productMapper.createProduct(foundProduct, data);
            _repo.save(foundProduct);
        }
        if(images!=null){
            productImageService.createProductImages(images, productId);
        }
        if(details!=null){
            productDetailsService.createNewDetails(details, productId);
        }
        if(recipes!=null){
            productRecipeService.deleteRecipesByProductId(productId);
            productRecipeService.createNewRecipe(recipes, productId);
        }
        return getProductDetails(productId);
    }

    public Product findById(String productId){
        return _repo.findById(productId)
                .orElseThrow(()->new AppExceptions(ErrorCode.PRODUCT_NOT_FOUND));
    }

    public boolean isActiveProduct(String productId){
        return findById(productId).getIsActive();
    }
}
