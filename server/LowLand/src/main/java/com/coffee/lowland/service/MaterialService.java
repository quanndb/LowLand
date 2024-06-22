package com.coffee.lowland.service;

import com.coffee.lowland.DTO.request.productType.ProductSizeDto;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.ProductTypeMapper;
import com.coffee.lowland.model.Material;
import com.coffee.lowland.model.ProductSize;
import com.coffee.lowland.repository.MaterialRepository;
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
public class MaterialService {
    MaterialRepository _repo;

    public boolean CreateOrUpdate(Material data){
        Optional<Material> modelCheck = _repo.findByMaterialName(data.getMaterialName());
        if(modelCheck.isPresent()){
            if(modelCheck.get().getMaterialId() != data.getMaterialId())
                throw new AppExceptions(ErrorCode.PRODUCT_MATERIAL_EXISTED);
        }
        _repo.save(data);
        return true;
    }

    @Transactional
    public List<Material> GetAll(){
        List<Material> lst = _repo.findAll();
        return lst;
    }
    public boolean AddQuantity(int Quantiy, int MaterialId){
        Material modelCheck = _repo.findById(MaterialId)
                .orElseThrow(() -> new AppExceptions(ErrorCode.PRODUCT_MATERIAL_NOT_FOUND));
        int totalQuantity = modelCheck.getQuantity() + Quantiy;
        modelCheck.setQuantity(totalQuantity);
        _repo.save(modelCheck);
        return true;
    }
    /*@Transactional
    public int GetTotalPage(String keyWords){
        log.error(keyWords);
        return _repo.spGetProductTypes(keyWords);
    }*/

    public boolean Delete(int id){
        Optional<Material> res = _repo.findById(id);
        if(res.isEmpty()){
            throw new AppExceptions(ErrorCode.PRODUCT_MATERIAL_EXISTED);
        }
        _repo.deleteById(id);
        return true;
    }

    public Optional<Material> GetById(int id){
        Optional<Material> res = _repo.findById(id);
        if(res.isEmpty()){
            throw new AppExceptions(ErrorCode.PRODUCT_MATERIAL_EXISTED);
        }
        return res;
    }
}
