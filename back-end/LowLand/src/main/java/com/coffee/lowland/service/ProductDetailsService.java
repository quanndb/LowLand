package com.coffee.lowland.service;

import com.coffee.lowland.DTO.response.ProductDetailResponse;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.ProductTypeMapper;
import com.coffee.lowland.model.ProductDetails;
import com.coffee.lowland.repository.ProductDetailsRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductDetailsService {
    ProductDetailsRepository _repo;
    ProductTypeMapper _map;

    @Transactional
    public List<ProductDetailResponse> GetAll(String ProductId){
        List<Object[]> lst = _repo.spGetAllProductDetailByProductId(ProductId);
        List<ProductDetailResponse> data = new ArrayList<>();
        for(Object[] item : lst){
            data.add(
                    ProductDetailResponse.builder()
                            .price(((BigDecimal) item[0]).intValue())
                            .sizeName((String)item[1])
                            .productSizeId((String)item[2])
                            .productDetailsId((String)item[3])
                            .build()
            );
        }
        return data;
    }

    public boolean Create(List<ProductDetails> data){
        String ProductId = data.get(0).getProductId();
        Optional<List<ProductDetails>> lst = _repo.findByProductId(ProductId);
        if(lst.isPresent()){
            for( int i =0; i < lst.get().size(); i++){
                Delete(lst.get().get(i).getProductDetailsId());
            }
        }
        _repo.saveAll(data);
        return true;
    }
    public boolean Delete(String id){
        ProductDetails prD = _repo.findById(id)
                        .orElseThrow(() -> new AppExceptions(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));
        _repo.deleteById(id);
        return true;
    }

}
