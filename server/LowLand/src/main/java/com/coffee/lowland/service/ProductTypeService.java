package com.coffee.lowland.service;
import com.coffee.lowland.DTO.response.Pagination;
import com.coffee.lowland.model.ProductType;
import com.coffee.lowland.repository.ProductTypeRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
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
    private ProductTypeRepository _repo;

    public ProductType CreateOrUpdate(ProductType data){
        data.setCreatedDate(LocalDateTime.now());
        ProductType modelCheck;
        modelCheck = _repo.findByCode(data.getCode());
//        if(modelCheck.getProductTypeId() != data.getProductTypeId()){
//            return null;
//        }
        return  _repo.save(data);
    }
//    @Transactional
//    public List<ProductType> GetAll(String keyWords, int pageNumber){
//        List<ProductType> lst = _repo.spGetAllProductType(keyWords,pageNumber);
//        return lst;
//    }
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
