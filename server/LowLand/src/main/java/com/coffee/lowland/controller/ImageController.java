package com.coffee.lowland.controller;

import com.coffee.lowland.model.Image;
import com.coffee.lowland.model.Product;
import com.coffee.lowland.model.ResponseObject;
import com.coffee.lowland.repository.ImageRepository;
import com.coffee.lowland.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping ("/v1/images")
public class ImageController {
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/getAllImageOfProductById/{id}")
    public ResponseEntity<ResponseObject> getProductImages(@PathVariable Integer id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
//            Product product = optionalProduct.get();
            // Lấy tất cả các ảnh có type là product và có productID khớp với id của sản phẩm
            List<Image> productImages = imageRepository.findByTypeAndProductID("product", id);

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Retrieved all images of the product successfully", productImages)
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("false", "Cannot find product with id=" + id, "")
            );
        }
    }
    @PostMapping("/addProductImage/{id}")
    public ResponseEntity<ResponseObject> addImageToProduct(@PathVariable Integer id, @RequestBody Image newImage) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
//            Product product = optionalProduct.get();
            newImage.setType("product");
            newImage.setProductID(id);
            Image savedImage = imageRepository.save(newImage);

            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseObject("ok", "Image added to product successfully", savedImage)
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("false", "Cannot find product with id=" + id, "")
            );
        }
    }

    @PutMapping("/updateImage/{id}")
    public ResponseEntity<ResponseObject> updateImage(@PathVariable Integer id, @RequestBody Image updatedImageInfo) {
        Optional<Image> optionalImage = imageRepository.findById(id);
        if (optionalImage.isPresent()) {
            try {
                Image img = optionalImage.get();
                if (updatedImageInfo.getName() != null) {
                    img.setName(updatedImageInfo.getName());
                }
                img.setProductID(updatedImageInfo.getProductID());
                if (updatedImageInfo.getType() != null) {
                    img.setType(updatedImageInfo.getType());
                }
                if (updatedImageInfo.getImage() != null) {
//                    String newUrl = updatedImageInfo.getImage().replace("\"", "");
//                    img.setImage(newUrl);
                    img.setImage(updatedImageInfo.getImage());
                }
//                if (updatedImageInfo.getBlogID() != null) {
//                    img.setBlogID(updatedImageInfo.getBlogID());
//                }
                Image updatedImage = imageRepository.save(img);
                return ResponseEntity.status(HttpStatus.CREATED).body(
                        new ResponseObject("ok", "Updated image successfully", updatedImage)
                );
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                        new ResponseObject("false", "Failed to update image", e.getMessage())
                );
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("false", "Cannot find image with id=" + id, "")
            );
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteImageById (@PathVariable int id)
    {
        Optional<Image> optionalImage = imageRepository.findById(id);
        if (optionalImage.isPresent()) {
            try {
                imageRepository.deleteById(id);
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("ok", "Deleted image successfully", "")
                );
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                        new ResponseObject("false", "Failed to delete image", e.getMessage())
                );
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("false", "Cannot find image with id=" + id, "")
            );
        }
    }
}
