package com.coffee.lowland.service;


import com.coffee.lowland.model.Image;
import com.coffee.lowland.repository.ImageRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ImageService {

    ImageRepository imageRepository;

    public List<Image> list(){
        return imageRepository.findByOrderById();
    }

    public Optional<Image> getOne(String id){
        return imageRepository.findById(id);
    }

    public Image save(Image image){
        return imageRepository.save(image);
    }

    public void delete(String id){
        imageRepository.deleteById(id);
    }

    public boolean exists(String id){
        return imageRepository.existsById(id);
    }

    public Optional<Image> findById(String id) {
        return imageRepository.findById(id);
    }

    public List<Image> findByTypeAndProductID(String product, String id) {
        return imageRepository.findByTypeAndProductID(product,id);
    }
}