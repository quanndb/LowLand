package com.coffee.lowland.service;

import com.coffee.lowland.DTO.CreateImageDTO;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.ImageMapper;
import com.coffee.lowland.model.ProductImage;
import com.coffee.lowland.repository.ProductImageRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductImageService {
    CloudinaryService _service;
    ProductImageRepository _repo;
    ImageMapper _mapper;

    public CreateImageDTO CreateImage(String imageBase64) throws IOException {
        MultipartFile file =  _service.base64ToMultipart(imageBase64);
        Object response =  _service.upload(file);
        return _mapper.DataToCreateImageDTO(response);
    }

    public boolean DeleteImage(int id) throws IOException {
        ProductImage prImage = _repo.findById(id)
                .orElseThrow(() -> new AppExceptions(ErrorCode.PRODUCT_IMAGE_NOT_FOUND));
        _service.delete(prImage.getCloudImageId());
        _repo.deleteById(id);
        return true;
    }

}
