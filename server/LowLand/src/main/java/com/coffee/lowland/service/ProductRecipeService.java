package com.coffee.lowland.service;

import com.coffee.lowland.DTO.response.ProductDetailResponse;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.ProductTypeMapper;
import com.coffee.lowland.model.ProductDetails;
import com.coffee.lowland.model.ProductRecipe;
import com.coffee.lowland.repository.ProductDetailsRepository;
import com.coffee.lowland.repository.ProductRecipeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductRecipeService {
    ProductRecipeRepository _repo;
    ProductTypeMapper _map;

    @Transactional
    public List<ProductRecipe> GetAllByProductId(int ProductId){
       List<ProductRecipe> lst = _repo.findAllByProductId(ProductId);
        return lst;
    }

    public boolean Create(List<ProductRecipe> data, int ProductId){
        List<ProductRecipe> lst = _repo.findAllByProductId(ProductId);
        if(!lst.isEmpty()){
            for( int i =0; i < lst.size(); i++){
                Delete(lst.get(i).getProductRecipeId());
            }
        }
        for(ProductRecipe p : data){
            p.setProductId(ProductId);
        }
        _repo.saveAll(data);
        return true;
    }
    public boolean Delete(int id){
        ProductRecipe prD = _repo.findById(id)
                .orElseThrow(() -> new AppExceptions(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));
        _repo.deleteById(id);
        return true;
    }
}
