package com.coffee.lowland.service;
import com.coffee.lowland.DTO.response.Pagination;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.ProductTypeMapper;
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
    ProductTypeMapper productTypeMapper;

    public boolean CreateOrUpdate(ProductType data){
        Optional<ProductType> modelCheck = _repo.findByCode(data.getCode());
        if(modelCheck.isPresent()){
            if(modelCheck.get().getProductTypeId() != data.getProductTypeId())
                throw new AppExceptions(ErrorCode.PRODUCT_TYPE_EXISTED);
        }
            Optional<ProductType> res = _repo.findById(data.getProductTypeId());
            String userName = SecurityContextHolder.getContext().getAuthentication().getName();
            LocalDateTime now = LocalDateTime.now();
            if(res.isPresent()){
                res.get().setUpdatedBy(userName);
                res.get().setUpdatedDate(now);
                productTypeMapper.updatePT(res.get(),data);
                _repo.save(res.get());
            }
            else {
                if(data.getProductTypeId()>0) throw new AppExceptions(ErrorCode.PRODUCT_TYPE_EXISTED);
                data.setCreatedBy(userName);
                data.setCreatedDate(now);
                _repo.save(data);
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

    public boolean Delete(int id){
        _repo.deleteById(id);
        return true;
    }

}
