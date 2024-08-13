package com.coffee.lowland.service.Product;

import com.coffee.lowland.DTO.response.ProductDetailResponse;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.ProductDetails;
import com.coffee.lowland.JPA.repository.ProductDetailsRepository;
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
        List<ProductDetails> lst = _repo.findAllByProductId(ProductId);

        return lst.stream()
                .map(item-> {
                    String sizeName = productSizeService.getById(item.getProductSizeId())
                            .getSizeName();
                    return ProductDetailResponse.builder()
                            .productDetailsId(item.getProductDetailsId())
                            .sizeName(sizeName)
                            .price(item.getPrice())
                            .productSizeId(item.getProductSizeId())
                            .build();
                })
                .collect(Collectors.toList());
    }

    public boolean createNewDetails(List<ProductDetails> data,String productId){
        _repo.deleteAllByProductId(productId);
        data.forEach(p -> p.setProductId(productId));
        _repo.saveAll(data);
        return true;
    }
}
