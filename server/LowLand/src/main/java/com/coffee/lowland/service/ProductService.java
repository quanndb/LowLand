package com.coffee.lowland.service;

import com.coffee.lowland.DTO.CreateImageDTO;
import com.coffee.lowland.DTO.request.product.ProductDataDto;
import com.coffee.lowland.DTO.request.product.ProductDto;
import com.coffee.lowland.DTO.request.productType.ProductTypeDto;
import com.coffee.lowland.DTO.response.order.GetOrdersResponse;
import com.coffee.lowland.DTO.response.product.ProductRespone;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.ProductTypeMapper;
import com.coffee.lowland.model.Product;
import com.coffee.lowland.model.ProductDetails;
import com.coffee.lowland.model.ProductImage;
import com.coffee.lowland.model.ProductType;
import com.coffee.lowland.repository.ProductImageRepository;
import com.coffee.lowland.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductService {
    ProductRepository _repo;
    ProductImageRepository _imgRepo;
    ProductTypeMapper _map;
    ProductDetailsService _detailService;
    ProductImageService _imageService;

    public boolean CreateOrUpdateProduct(ProductDataDto data) throws IOException {
        ProductDto model = _map.MapProductDto(data);
        int ProductId = CreateOrUpdate(model);
        List<ProductDetails> lst =  data.getListDetail();
        for(ProductDetails detail : lst){
            detail.setProductId(ProductId);
        }
        List<String> images = data.getListImageBase64();
        for(String image : images){
            _imageService.CreateImage(image, ProductId);
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

    @Transactional
    public List<ProductRespone> GetAll(int ProductID){
        List<ProductRespone> result = new ArrayList<>();
        List<Object[]> orders = _repo.spGetAllProductForView(ProductID);
        for(Object[] item : orders){
            result.add(
                    ProductRespone.builder()
                            .productTypeName((String) item[0])
                            .price(((BigDecimal) item[1]).intValue())
                            .sizeName((String)item[2])
                            .imageName((String)item[3])
                            .imageUrl(item[4].toString())
                            .productId((Integer) item[5])
                            .code((String)item[6])
                            .productName((String)item[7])
                            .description((String) item[8])
                            .isActive((boolean)item[9])
                            .build()
            );
        }
        return result;
    }

    @Transactional
    public List<ProductRespone> GetByID(int ProductID){
        List<ProductRespone> result = new ArrayList<>();
        List<Object[]> orders = _repo.spGetAllProductForView(ProductID);
        for(Object[] item : orders){
            result.add(
                    ProductRespone.builder()
                            .productTypeName((String) item[0])
                            .price(((BigDecimal) item[1]).intValue())
                            .sizeName((String)item[2])
                            .imageName((String)item[3])
                            .imageUrl(item[4].toString())
                            .productId((Integer) item[5])
                            .code((String)item[6])
                            .productName((String)item[7])
                            .description((String) item[8])
                            .isActive((boolean)item[9])
                            .build()
            );
        }
        return result;
    }




    public boolean Delete(int id){
        Product res = _repo.findById(id).orElseThrow( () -> new AppExceptions(ErrorCode.PRODUCT_NOT_FOUND));
        _repo.deleteById(id);
        return true;
    }
    public Optional<Product> GetByProductId(int id){
        Optional<Product> res = _repo.findByProductId(id);
        if(res.isEmpty()){
            throw new AppExceptions(ErrorCode.PRODUCT_NOT_FOUND);
        }
        return res;
    }



}
