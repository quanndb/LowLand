package com.coffee.lowland.service;
import com.coffee.lowland.DTO.response.Pagination;
import com.coffee.lowland.model.ProductType;
import com.coffee.lowland.repository.ProductTypeRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ProductTypeService {
    private ProductTypeRepository _repo;

    public ProductType CreateOrUpdate(ProductType data){
        ProductType modelCheck = new ProductType();
        modelCheck = _repo.findByCode(data.getCode());
        if(modelCheck.getProductTypeId() != data.getProductTypeId()){
            return null;
        }
        return  _repo.save(data);
    }
    @Transactional
    public List<ProductType> GetAll(String keyWords, int pageNumber){
        List<ProductType> lst = _repo.spGetAllProductType(keyWords,pageNumber);
        return lst;
    }
    @Transactional
    public Pagination GetTotalPage(String keyWords){
        Pagination data = _repo.spGetTotalProductType(keyWords);
        return data;
    }

    public boolean Delete(int id){
        _repo.deleteById(id);
        return true;
    }

}
