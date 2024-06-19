package com.coffee.lowland.service;

import com.coffee.lowland.DTO.request.productType.ProductSizeDto;
import com.coffee.lowland.DTO.request.productType.ProductTypeDto;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.ProductTypeMapper;
import com.coffee.lowland.model.ProductSize;
import com.coffee.lowland.model.ProductType;
import com.coffee.lowland.repository.ProductSizeRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Slf4j
public class ProductSizeService {
    ProductSizeRepository _repo;
    ProductTypeMapper _map;

    public boolean CreateOrUpdate(ProductSizeDto data){
        Optional<ProductSize> modelCheck = _repo.findBySizeName(data.getSizeName());
        if(modelCheck.isPresent()){
            if(modelCheck.get().getProductSizeId() != data.getProductSizeId())
                throw new AppExceptions(ErrorCode.PRODUCT_Size_EXISTED);
        }
        Optional<ProductSize> res = _repo.findById(data.getProductSizeId());
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        LocalDateTime now = LocalDateTime.now();
        if(res.isPresent()){
            res.get().setUpdatedBy(userName);
            res.get().setUpdatedDate(now);
            _map.MapProductSize(res.get(),data);
            _repo.save(res.get());
        }
        else {
            if(data.getProductSizeId()>0) throw new AppExceptions(ErrorCode.PRODUCT_Size_NOT_FOUND);
            ProductSize newModel = new ProductSize();
            newModel.setCreatedBy(userName);
            newModel.setCreatedDate(now);
            _map.MapProductSize(newModel,data);
            _repo.save(newModel);
        }
        return true;
    }

    @Transactional
    public List<ProductSize> GetAll(String keyWords, int pageNumber){
        List<ProductSize> lst = _repo.spGetAllProductSize(keyWords,1);
        return lst;
    }

    /*@Transactional
    public int GetTotalPage(String keyWords){
        log.error(keyWords);
        return _repo.spGetProductTypes(keyWords);
    }*/

    public boolean Delete(int id){
        Optional<ProductSize> res = _repo.findById(id);
        if(res.isEmpty()){
            throw new AppExceptions(ErrorCode.PRODUCT_Size_NOT_FOUND);
        }
        _repo.deleteById(id);
        return true;
    }

    public Optional<ProductSize> GetById(int id){
        Optional<ProductSize> res = _repo.findById(id);
        if(res.isEmpty()){
            throw new AppExceptions(ErrorCode.PRODUCT_Size_NOT_FOUND);
        }
        return res;
    }
}
