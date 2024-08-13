package com.coffee.lowland.service.Product;

import com.coffee.lowland.DTO.request.productType.ProductSizeDto;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.ProductSize;
import com.coffee.lowland.JPA.repository.ProductSizeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ProductSizeService {
    ProductSizeRepository _repo;

    public List<ProductSize> getAllSize(String query){
        return _repo.findAllBySizeNameContainsIgnoreCase(query);
    }

    public ProductSize createSize(ProductSizeDto request){
        checkSizeName(request.getSizeName());
        return _repo.save(ProductSize.builder()
                        .sizeName(request.getSizeName())
                        .description(request.getDescription())
                .build());
    }

    public ProductSize updateSize(ProductSize request){
        getById(request.getProductSizeId());
        checkSizeName(request.getSizeName());
        return _repo.save(request);
    }

    public boolean deleteById(String id){
        ProductSize foundSize = getById(id);
        _repo.deleteById(foundSize.getProductSizeId());
        return true;
    }

    public ProductSize getById(String id){
        return _repo.findById(id)
                .orElseThrow(()-> new AppExceptions(ErrorCode.PRODUCT_SIZE_NOT_FOUND));
    }

    public void checkSizeName(String sizeName){
        if(_repo.existsBySizeNameIgnoreCase(sizeName)){
            throw new AppExceptions(ErrorCode.PRODUCT_SIZE_EXISTED);
        }
    }
}
