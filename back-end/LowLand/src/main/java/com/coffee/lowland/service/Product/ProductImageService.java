package com.coffee.lowland.service.Product;

import com.coffee.lowland.DTO.response.utilities.CloudResponse;
import com.coffee.lowland.DTO.response.product.ProductImageResponse;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.CloudImageMapper;
import com.coffee.lowland.mapper.ProductImageMapper;
import com.coffee.lowland.model.ProductImage;
import com.coffee.lowland.JPA.repository.ProductImageRepository;
import com.coffee.lowland.service.Utilities.CloudinaryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductImageService {
    CloudinaryService _service;
    ProductImageRepository _repo;
    CloudImageMapper cloudImageMapper;
    ProductImageMapper productImageMapper;

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public List<ProductImage> createProductImages(MultipartFile[] files, String productId) throws IOException {
        List<ProductImage> images  = new ArrayList<>();
        for(MultipartFile item: files){
            Map<?,?> res = _service.upload(item);
            CloudResponse cloudResponse = cloudImageMapper.toCloudResponse(res);
            images.add(_repo.save(ProductImage.builder()
                        .productId(productId)
                        .cloudImageId(cloudResponse.getPublicId())
                        .imageName(cloudResponse.getOriginalFilename())
                        .imageUrl(cloudResponse.getUrl())
                        .build()));
        }
        return images;
    }

    public List<ProductImageResponse> getProductImages(String ProductId){
        return productImageMapper.toListProductImageResponse(_repo.findAllByProductId(ProductId));
    }
    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public boolean deleteProductImage(String productId, String imageId) throws IOException {
        ProductImage productImage = _repo.findById(imageId)
                .orElseThrow(() -> new AppExceptions(ErrorCode.PRODUCT_IMAGE_NOT_FOUND));
        if(!Objects.equals(productImage.getProductId(), productId))
            throw new AppExceptions(ErrorCode.PRODUCT_NOT_FOUND);
        _service.delete(productImage.getCloudImageId());
        _repo.deleteById(imageId);
        return true;
    }
}
