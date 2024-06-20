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
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductDetailsService {
    ProductDetailsRepository _repo;
    ProductTypeMapper _map;

    public Optional<List<ProductDetails>> GetAll(int ProductId){
        Optional<List<ProductDetails>> lst = _repo.findByProductId(ProductId);
        return lst;
    }

    public boolean Create(List<ProductDetails> data){
        int ProductId = data.get(0).getProductId();
        Optional<List<ProductDetails>> lst = GetAll(ProductId);
        if(lst.isPresent()){
            for( int i =0; i < lst.get().size(); i++){
                Delete(lst.get().get(i).getProductDetailsId());
            }
        }
        _repo.saveAll(data);
        return true;
    }
    public boolean Delete(int id){
        ProductDetails prD = _repo.findById(id)
                        .orElseThrow(() -> new AppExceptions(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));
        _repo.deleteById(id);
        return true;
    }
    @Transactional
    public void DeleteAllByProductId(int ProductId){
        _repo.deleteAllByProductId(ProductId);
    }
}
