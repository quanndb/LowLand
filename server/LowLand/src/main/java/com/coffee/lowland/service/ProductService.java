package com.coffee.lowland.service;

import com.coffee.lowland.DTO.request.product.ProductDataDto;
import com.coffee.lowland.DTO.request.product.ProductDto;
import com.coffee.lowland.DTO.response.PageServiceResponse;
import com.coffee.lowland.DTO.response.product.ProductResponse;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.ProductTypeMapper;
import com.coffee.lowland.model.*;
import com.coffee.lowland.repository.ProductImageRepository;
import com.coffee.lowland.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ProductService {
    ProductRepository _repo;
    ProductTypeMapper _map;
    ProductDetailsService _detailService;
    ProductImageService _imageService;
    ProductImageRepository _PIRepo;
    ProductRecipeService _recipeService;
    PageService<ProductResponse> productPageService;

    public boolean CreateOrUpdateProduct(MultipartFile[] images, String recipe, String details) throws IOException {
        ProductDto model = _map.MapProductDto(data);
        String ProductId = CreateOrUpdate(model);
        List<ProductDetails> lst =  data.getListDetail();
        for(ProductDetails detail : lst){
            detail.setProductId(ProductId);
        }

        List<ProductRecipe> listRecipe = data.getListRecipe();
        _recipeService.Create(listRecipe, ProductId);

        List<String> images = data.getListImageBase64();
        List<ProductImage> listImage = _PIRepo.findAllByProductId(ProductId);
        if(!lst.isEmpty()) {
            for(ProductImage p : listImage) {
                _imageService.DeleteImage(p.getProductImageId());
            }
        }
        for(String image : images){
            _imageService.CreateProductImage(image, ProductId);
        }
        _detailService.Create(lst);
        return true;
    }


    public String CreateOrUpdate(ProductDto data){
        Product save;
        Optional<Product> modelCheck = _repo.findById(data.getProductId());
        if(modelCheck.isPresent()){
            if(modelCheck.get().getProductId() != data.getProductId())
                throw new AppExceptions(ErrorCode.PRODUCT_EXISTED);
        }
        Optional<Product> res = _repo.findById(data.getProductId());
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        LocalDateTime now = LocalDateTime.now();
        if(res.isPresent()){
            _map.MapProduct(res.get(),data);
            save = _repo.save(res.get());
        }
        else {
            Product newModel = new Product();
            _map.MapProduct(newModel,data);
            save = _repo.save(newModel);
        }
        return save.getProductId();
    }

    @Transactional
    public PageServiceResponse<ProductResponse> getProductPage
            (int page, int size, String query,
             String productId, Boolean isActive, String productTypeId){
        return productPageService.pageResponse(
                "spGetProductsByPage",ProductResponse.class
                ,page,size,query,productId,isActive,productTypeId);
    }

    public void deleteProduct(String id){
        Product res = _repo.findById(id).orElseThrow( () -> new AppExceptions(ErrorCode.PRODUCT_NOT_FOUND));
        _repo.deleteById(id);
    }

    public Optional<Product> GetByProductId(String id){
        Optional<Product> res = _repo.findById(id);
        if(res.isEmpty()){
            throw new AppExceptions(ErrorCode.PRODUCT_NOT_FOUND);
        }
        return res;
    }
}
