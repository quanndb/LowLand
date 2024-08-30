package com.coffee.lowland.service.Product;

import com.coffee.lowland.DTO.request.product.CreateProductDetails;
import com.coffee.lowland.DTO.response.product.ProductDetailResponse;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.ProductDetails;
import com.coffee.lowland.JPA.repository.ProductDetailsRepository;
import com.coffee.lowland.model.ProductSize;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductDetailsService {
    ProductDetailsRepository _repo;
    ProductSizeService productSizeService;

    public List<ProductDetailResponse> getProductSizeAndPrice(String ProductId){
        List<ProductDetails> lst = _repo.findByProductIdAndIsActiveOrderByPrice(ProductId, true);
        return lst.stream()
                .map(item-> {
                    String sizeName = productSizeService.getById(item.getProductSizeId())
                            .getSizeName();
                    return ProductDetailResponse.builder()
                            .productId(ProductId)
                            .productDetailsId(item.getProductDetailsId())
                            .sizeName(sizeName)
                            .price(item.getPrice())
                            .salePrice(item.getSalePrice())
                            .productSizeId(item.getProductSizeId())
                            .build();
                })
                .collect(Collectors.toList());
    }

    public void createNewDetails(CreateProductDetails[] data, String productId){
        for(CreateProductDetails item : data){
            if (item.getProductDetailsId() != null)
                deleteDetailsById(productId,item.getProductDetailsId());
            ProductSize size = productSizeService
                    .getSizeOrCreateSizeBySizeName(item.getSizeName());
             _repo.save(ProductDetails.builder()
                     .price(item.getPrice())
                     .salePrice(item.getSalePrice() ==0 ? null : item.getSalePrice())
                     .productId(productId)
                     .isActive(true)
                     .productSizeId(size.getProductSizeId())
                     .build());
        }
    }

    public void deleteDetailsByProductId(String productId){
        List<ProductDetails> list = _repo.findByProductIdAndIsActiveOrderByPrice(productId, true);
        for(ProductDetails item:list){
            deleteDetailsById(productId, item.getProductDetailsId());
        }
    }

    public boolean deleteDetailsById(String productId, String detailsId){
        ProductDetails foundDetails = _repo.findById(detailsId)
                .orElseThrow(()->new AppExceptions(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));
        if(!foundDetails.getProductId().equals(productId)){
            throw new AppExceptions(ErrorCode.PRODUCT_NOT_FOUND);
        }
        foundDetails.setIsActive(false);
        _repo.save(foundDetails);
        return true;
    }
}
