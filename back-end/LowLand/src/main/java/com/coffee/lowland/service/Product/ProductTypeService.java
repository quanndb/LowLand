package com.coffee.lowland.service.Product;
import com.coffee.lowland.DTO.request.productType.ProductTypeDto;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.ProductType;
import com.coffee.lowland.JPA.repository.ProductTypeRepository;
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
public class ProductTypeService {
    ProductTypeRepository _repo;

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public ProductType createNewType(ProductTypeDto data){
        checkTypeName(data.getTypeName());
        return _repo.save(ProductType.builder()
                .typeName(data.getTypeName())
                .description(data.getDescription())
                .build());
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public ProductType updateType(ProductType data){
        getProductTypeById(data.getProductTypeId());
        checkTypeName(data.getTypeName());
        return _repo.save(data);
    }

    public List<ProductType> getAllProductType(String query, Integer size){
        if(size != null){
            Pageable pageable = Pageable.ofSize(size);
            return _repo.findByTypeNameContainsIgnoreCase(query,pageable).getContent();
        }
        else return _repo.findByTypeNameContainsIgnoreCase(query);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public boolean deleteProductTypeById(String id){
        ProductType foundType = getProductTypeById(id);
        foundType.setIsActive(false);
        _repo.save(foundType);
        return true;
    }
    public ProductType getProductTypeById(String id){
        return _repo.findById(id)
                .orElseThrow(()->
                        new AppExceptions(ErrorCode.PRODUCT_TYPE_NOT_FOUND));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public ProductType getOrCreateProductTypeByName(ProductTypeDto type){
        return _repo.findByTypeNameIgnoreCase(type.getTypeName())
                .orElseGet(() -> {
                    ProductType newType = new ProductType();
                    newType.setTypeName(type.getTypeName());
                    newType.setDescription(type.getDescription());
                    return _repo.save(newType);
                });
    }

    public void checkTypeName(String typeName){
        if(_repo.existsByTypeNameIgnoreCase(typeName)){
            throw new AppExceptions(ErrorCode.PRODUCT_TYPE_EXISTED);
        }
    }
}
