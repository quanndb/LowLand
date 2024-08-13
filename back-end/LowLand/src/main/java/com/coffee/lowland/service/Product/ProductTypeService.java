package com.coffee.lowland.service.Product;
import com.coffee.lowland.DTO.request.productType.ProductTypeDto;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.ProductType;
import com.coffee.lowland.JPA.repository.ProductTypeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ProductTypeService {
    ProductTypeRepository _repo;

    public ProductType createNewType(ProductTypeDto data){
        checkTypeName(data.getTypeName());
        return _repo.save(ProductType.builder()
                .typeName(data.getTypeName())
                .description(data.getDescription())
                .build());
    }
    public ProductType updateType(ProductType data){
        getProductTypeById(data.getProductTypeId());
        checkTypeName(data.getTypeName());
        return _repo.save(data);
    }

    public List<ProductType> getAllProductType(String query){
        return _repo.findByTypeNameContainsIgnoreCase(query);
    }

    public boolean deleteProductTypeById(String id){
        getProductTypeById(id);
        _repo.deleteById(id);
        return true;
    }
    public ProductType getProductTypeById(String id){
        return _repo.findById(id)
                .orElseThrow(()->
                        new AppExceptions(ErrorCode.PRODUCT_TYPE_NOT_FOUND));
    }

    public void checkTypeName(String typeName){
        if(_repo.existsByTypeNameIgnoreCase(typeName)){
            throw new AppExceptions(ErrorCode.PRODUCT_TYPE_EXISTED);
        }
    }
}
