package com.coffee.lowland.service.Product;

import com.coffee.lowland.DTO.request.product.CreateProductRecipe;
import com.coffee.lowland.DTO.response.product.ProductRecipeDetailsResponse;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.Material;
import com.coffee.lowland.model.ProductRecipe;
import com.coffee.lowland.JPA.repository.ProductRecipeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductRecipeService {
    ProductRecipeRepository _repo;
    MaterialService materialService;

    public List<ProductRecipeDetailsResponse> getAllByProductId(String productId) {
        List<ProductRecipe> list = _repo.findAllByProductId(productId);

        return list.stream()
                .map(item -> {
                    Material material = materialService
                            .getMaterialById(item.getMaterialId());
                    return ProductRecipeDetailsResponse.builder()
                            .productId(productId)
                            .productRecipeId(item.getProductRecipeId())
                            .materialName(material.getMaterialName())
                            .unitName(material.getUnitName())
                            .quantity(item.getQuantity())
                            .build();
                })
                .collect(Collectors.toList());
    }

    public void createNewRecipe(CreateProductRecipe[] data, String productId){
        for(CreateProductRecipe item : data){
            Material foundMaterial = materialService.getMaterialByName(item.getMaterialName());
            _repo.save(ProductRecipe.builder()
                     .materialId(foundMaterial.getMaterialId())
                     .productId(productId)
                     .quantity(item.getQuantity())
                     .build());
        }
    }

    public void deleteRecipesByProductId(String productId){
        List<ProductRecipe> list = _repo.findAllByProductId(productId);
        for(ProductRecipe item : list){
            deleteRecipe(item.getProductRecipeId());
        }
    }

    public void deleteRecipe(String recipeId){
        _repo.findById(recipeId)
                .orElseThrow(() ->
                        new AppExceptions(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));
        _repo.deleteById(recipeId);
    }
}
