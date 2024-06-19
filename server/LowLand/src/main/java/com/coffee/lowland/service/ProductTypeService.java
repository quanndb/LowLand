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

    public int CreateOrUpdate(ProductType data){
        ProductType modelCheck = _repo.findByCode(data.getCode());
        if(modelCheck != null){
            if(modelCheck.getProductTypeId() != data.getProductTypeId()){
                return 2; //Bị trùng code
            }
        }
        ProductType model = new ProductType();
        if(data.getProductTypeId() > 0){
            model = _repo.findById(data.getProductTypeId()).get();
            if(model.getProductTypeId() <= 0) return 3; // Không tìm thấy id của Product
            model.setUpdatedDate(LocalDateTime.now());
        }
        else model.setCreatedDate(LocalDateTime.now());

        model.setCode(data.getCode());
        model.setTypeName(data.getTypeName());
        model.setDescription(data.getDescription());
        _repo.save(model);

        return 1; //Thành công
    }

    @Transactional
    public List<ProductType> GetAll(String keyWords, int pageNumber){
        return _repo.spGetAllProductType(keyWords,1000000000);
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
