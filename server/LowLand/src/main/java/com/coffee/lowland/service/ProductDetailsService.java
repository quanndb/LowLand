package com.coffee.lowland.service;

import com.coffee.lowland.DTO.request.productType.ProductSizeDto;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.ProductTypeMapper;
import com.coffee.lowland.model.ProductDetails;
import com.coffee.lowland.model.ProductSize;
import com.coffee.lowland.model.ProductType;
import com.coffee.lowland.repository.ProductDetailsRepository;
import com.coffee.lowland.repository.ProductSizeRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public class ProductDetailsService {
    ProductDetailsRepository _repo;
    ProductTypeMapper _map;

    public Optional<List<ProductDetails>> GetAll(int ProductId){
        Optional<List<ProductDetails>> lst = _repo.findByProductId(ProductId);
        return lst;
    }

    public boolean Create(List<ProductDetails> data){
        Optional<List<ProductDetails>> lst = GetAll(data.get(0).getProductId());
        if(lst.isPresent()){
            for( int i =0; i < lst.get().size(); i++){
                Delete(lst.get().get(i).getProductId());
            }
        }
        _repo.saveAll(data);
        return true;
    }

    public boolean Delete(int id){
        _repo.deleteById(id);
        return true;
    }
}
