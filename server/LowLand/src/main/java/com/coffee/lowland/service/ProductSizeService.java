package com.coffee.lowland.service;

import com.coffee.lowland.model.ProductSize;
import com.coffee.lowland.model.ProductType;
import com.coffee.lowland.repository.ProductSizeRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Slf4j
public class ProductSizeService {
    private ProductSizeRepository _repo;

    public int CreateOrUpdate(ProductSize data){
        ProductSize modelCheck = _repo.findBySizeName(data.getSizeName());
        if(modelCheck != null){
            if(modelCheck.getProductSizeId() != data.getProductSizeId()){
                return 2; //Bị trùng name
            }
        }
        ProductSize model = new ProductSize();
        if(data.getProductSizeId() > 0){
            model = _repo.findById(data.getProductSizeId()).get();
            if(model == null || model.getProductSizeId() <= 0) return 3; // Không tìm thấy id
            model.setUpdatedDate(LocalDateTime.now());
        }
        else model.setCreatedDate(LocalDateTime.now());

        model.setSizeName(data.getSizeName());
        model.setDescription(data.getDescription());


        _repo.save(model);
        return 1; //Thành công
    }

    @Transactional
    public List<ProductType> GetAll(String keyWords, int pageNumber){
        List<ProductType> lst = _repo.spGetAllProductSize(keyWords,10000000);
        return lst;
    }

    /*@Transactional
    public int GetTotalPage(String keyWords){
        log.error(keyWords);
        return _repo.spGetProductTypes(keyWords);
    }*/

    public boolean Delete(int id){
        _repo.deleteById(id);
        return true;
    }
}
