package com.coffee.lowland.service.Product;

import com.coffee.lowland.DTO.request.productType.ProductSizeDto;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.ProductSize;
import com.coffee.lowland.JPA.repository.ProductSizeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ProductSizeService {
    ProductSizeRepository _repo;

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public List<ProductSize> getSizes(String query, Integer size){
        if(size == null) return _repo.findAllBySizeNameContainsIgnoreCase(query);
        else return _repo.findAllBySizeNameContainsIgnoreCase(query, Pageable.ofSize(size)).getContent();
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public ProductSize createSize(ProductSizeDto request){
        checkSizeName(request.getSizeName());
        return _repo.save(ProductSize.builder()
                        .sizeName(request.getSizeName())
                        .description(request.getDescription())
                .build());
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public ProductSize getSizeOrCreateSizeBySizeName(String sizeName){
        return _repo.findBySizeNameIgnoreCase(sizeName)
                .orElseGet(()-> _repo.save(ProductSize.builder()
                                .sizeName(sizeName)
                        .build()));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public ProductSize updateSize(ProductSize request){
        getById(request.getProductSizeId());
        checkSizeName(request.getSizeName());
        return _repo.save(request);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public boolean deleteById(String id){
        ProductSize foundSize = getById(id);
        foundSize.setIsActive(false);
        _repo.save(foundSize);
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
