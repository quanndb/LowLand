package com.coffee.lowland.service;

import com.coffee.lowland.DTO.request.product.ProductDataDto;
import com.coffee.lowland.DTO.request.product.ProductDto;
import com.coffee.lowland.DTO.request.productType.ProductTypeDto;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.ProductTypeMapper;
import com.coffee.lowland.model.Product;
import com.coffee.lowland.model.ProductDetails;
import com.coffee.lowland.model.ProductType;
import com.coffee.lowland.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductService {
    ProductRepository _repo;
    ProductTypeMapper _map;
    ProductDetailsService _detailService;

    public boolean CreateOrUpdateProduct(ProductDataDto data){
        ProductDto model = _map.MapProductDto(data);
        int ProductId = CreateOrUpdate(model);
        List<ProductDetails> lst =  data.getListDetail();
        for(ProductDetails detail : lst){
            detail.setProductId(ProductId);
        }
        _detailService.Create(lst);
        return true;
    }


    public int CreateOrUpdate(ProductDto data){
        Product save = new Product();
        Optional<Product> modelCheck = _repo.findByCode(data.getCode());
        if(modelCheck.isPresent()){
            if(modelCheck.get().getProductId() != data.getProductId())
                throw new AppExceptions(ErrorCode.PRODUCT_EXISTED);
        }
        Optional<Product> res = _repo.findById(data.getProductId());
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        LocalDateTime now = LocalDateTime.now();
        if(res.isPresent()){
            res.get().setUpdatedBy(userName);
            res.get().setUpdatedDate(now);
            _map.MapProduct(res.get(),data);
            save = _repo.save(res.get());
        }
        else {
            if(data.getProductId()>0) throw new AppExceptions(ErrorCode.PRODUCT_NOT_FOUND);
            Product newModel = new Product();
            newModel.setCreatedBy(userName);
            newModel.setCreatedDate(now);
            _map.MapProduct(newModel,data);
            save = _repo.save(newModel);
        }
        return save.getProductId();
    }

    /*@Transactional
    public List<Product> GetAll(String keyWords, int pageNumber){
        return _repo.spGetAllProductType(keyWords,1);
    }*/


   /* @Transactional
    public int GetTotalPage(String keyWords){
        log.error(keyWords);
        return _repo.spGetProductTypes(keyWords);
    }*/

    public boolean Delete(int id){
        Product res = _repo.findById(id).orElseThrow( () -> new AppExceptions(ErrorCode.PRODUCT_NOT_FOUND));
        _repo.deleteById(id);
        return true;
    }
    public Optional<Product> GetById(int id){
        Optional<Product> res = _repo.findByProductId(id);
        if(res.isEmpty()){
            throw new AppExceptions(ErrorCode.PRODUCT_NOT_FOUND);
        }
        return res;
    }



}
