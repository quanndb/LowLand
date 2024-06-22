package com.coffee.lowland.service;

import com.coffee.lowland.DTO.request.productType.ProductSizeDto;
import com.coffee.lowland.DTO.response.ProductDetailResponse;
import com.coffee.lowland.DTO.response.product.ProductRespone;
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
    public List<ProductDetailResponse> GetAll(int ProductId){
        List<Object[]> lst = _repo.spGetAllProductDetailByProductId(ProductId);
        List<ProductDetailResponse> data = new ArrayList<>();
        for(Object[] item : lst){
            data.add(
                    ProductDetailResponse.builder()
                            .price(((BigDecimal) item[0]).intValue())
                            .sizeName((String)item[1])
                            .productSizeId((Integer)item[2])
                            .productDetailsId((Integer)item[3])
                            .build()
            );
        }
        return data;
    }

    public boolean Create(List<ProductDetails> data){
        int ProductId = data.get(0).getProductId();
        Optional<List<ProductDetails>> lst = _repo.findByProductId(ProductId);
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

}
