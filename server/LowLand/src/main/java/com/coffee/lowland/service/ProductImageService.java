package com.coffee.lowland.service;

import com.coffee.lowland.DTO.CreateImageDTO;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.ImageMapper;
import com.coffee.lowland.model.ProductImage;
import com.coffee.lowland.repository.ProductImageRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductImageService {
    CloudinaryService _service;
    ProductImageRepository _repo;
    ImageMapper _mapper;

    public void CreateProductImage(String imageBase64, int ProductId) throws IOException {
        try {
            File file =  _service.convertToMultipartFile(imageBase64);
            Object response =  _service.upload(file);
            String url = _mapper.getUrl(response);
            String public_id = _mapper.getPublicId(response);
            //Luu anh
            ProductImage newImg = new ProductImage();
            newImg.setProductId(ProductId);
            newImg.setCloudImageId(public_id);
            newImg.setImageUrl(url);
            _repo.save(newImg);

        } catch (IllegalArgumentException e) {
            throw new ClassCastException("Cannot cast LinkedHashMap to PayResponse: " + e.getMessage());
        }
    }

    public List<ProductImage> getProductImages(int ProductId) throws IOException {
        return _repo.findAllByProductId(ProductId);
    }

    public boolean DeleteImage(int id) throws IOException {
        ProductImage prImage = _repo.findById(id)
                .orElseThrow(() -> new AppExceptions(ErrorCode.PRODUCT_IMAGE_NOT_FOUND));
        _service.delete(prImage.getCloudImageId());
        _repo.deleteById(id);
        return true;
    }

    public String CreateImageUrl(String imageBase64) throws IOException {
        try {
            File file =  _service.convertToMultipartFile(imageBase64);
            Object response =  _service.upload(file);
            String url = _mapper.getUrl(response);
            String public_id = _mapper.getPublicId(response);
            return url;
        } catch (IllegalArgumentException e) {
            throw new ClassCastException("Cannot cast LinkedHashMap to PayResponse: " + e.getMessage());
        }
    }
}
