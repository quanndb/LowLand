package com.coffee.lowland.service;
import com.coffee.lowland.DTO.request.productType.ProductTypeDto;
import com.coffee.lowland.DTO.response.Pagination;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.ProductTypeMapper;
import com.coffee.lowland.model.ProductSize;
import com.coffee.lowland.model.ProductType;
import com.coffee.lowland.repository.ProductTypeRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Slf4j
public class ProductTypeService {
    ProductTypeRepository _repo;
    ProductTypeMapper _map;

    public boolean CreateOrUpdate(ProductTypeDto data){
        Optional<ProductType> modelCheck = _repo.findById(data.getProductTypeId());
        if(modelCheck.isPresent()){
            if(modelCheck.get().getProductTypeId() != data.getProductTypeId())
                throw new AppExceptions(ErrorCode.PRODUCT_TYPE_EXISTED);
        }
            Optional<ProductType> res = _repo.findById(data.getProductTypeId());
            String userName = SecurityContextHolder.getContext().getAuthentication().getName();
            LocalDateTime now = LocalDateTime.now();
            if(res.isPresent()){
                _map.MapProductType(res.get(),data);
                _repo.save(res.get());
            }
            else {
                if(data.getProductTypeId() != null) throw new AppExceptions(ErrorCode.PRODUCT_TYPE_NOT_FOUND);
                ProductType newModel = new ProductType();
                _map.MapProductType(newModel,data);
                _repo.save(newModel);
            }
        return true;
    }

    @Transactional
    public List<ProductType> GetAll(String keyWords, int pageNumber){
        return _repo.spGetAllProductType(keyWords,1);
    }


    @Transactional
    public int GetTotalPage(String keyWords){
        log.error(keyWords);
        return _repo.spGetProductTypes(keyWords);
    }

    public boolean Delete(String id){
        Optional<ProductType> res = _repo.findById(id);
        if(res.isEmpty()){
            throw new AppExceptions(ErrorCode.PRODUCT_TYPE_NOT_FOUND);
        }
        _repo.deleteById(id);
        return true;
    }
    public Optional<ProductType> GetById(String id){
        Optional<ProductType> res = _repo.findById(id);
        if(res.isEmpty()){
            throw new AppExceptions(ErrorCode.PRODUCT_TYPE_NOT_FOUND);
        }
        return res;
    }
}
