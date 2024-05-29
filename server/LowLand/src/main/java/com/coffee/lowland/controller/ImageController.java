//package com.coffee.lowland.controller;
//
//import com.coffee.lowland.model.Image;
//
//import com.coffee.lowland.service.CloudinaryService;
//import com.coffee.lowland.service.ImageService;
//import lombok.AccessLevel;
//import lombok.RequiredArgsConstructor;
//import lombok.experimental.FieldDefaults;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import javax.imageio.ImageIO;
//import java.io.IOException;
//import java.util.List;
//import java.util.Map;
//import java.util.Objects;
//import java.util.Optional;
//
//@RestController
//@RequestMapping ("/v1/admin/images")
//@RequiredArgsConstructor
//@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
//public class ImageController {
//
//    ImageService imageService;
//    ProductRepository productRepository;
//    CloudinaryService cloudinaryService;
//
//    @GetMapping("/getAllImageOfProductById/{id}")
//    public ResponseEntity<Object> getProductImages(@PathVariable String id) {
//        Optional<Product> optionalProduct = productRepository.findById(id);
//        if (optionalProduct.isPresent()) {
////            Product product = optionalProduct.get();
//            // Lấy tất cả các ảnh có type là product và có productID khớp với id của sản phẩm
//            List<Image> productImages = imageService.findByTypeAndProductID("product", id);
//
//            return ResponseEntity.status(HttpStatus.OK).body(productImages);
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot find product with id=" + id);
//        }
//    }
//    @PostMapping("/addProductImage/{id}")
//    public ResponseEntity<Object> addImageToProduct(@PathVariable String id, @RequestBody Image newImage) {
//        Optional<Product> optionalProduct = productRepository.findById(id);
//        if (optionalProduct.isPresent()) {
////            Product product = optionalProduct.get();
//            newImage.setType("product");
//            newImage.setProductID(id);
//            Image savedImage = imageService.save(newImage);
//
//            return ResponseEntity.status(HttpStatus.CREATED).body(savedImage);
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot find product with id=");
//        }
//    }
//
//    @PostMapping("/upload")
//    @ResponseBody
//    public ResponseEntity<Object> upload(@RequestParam("file") MultipartFile multipartFile,@RequestParam String type, @RequestParam String productID, @RequestParam String blogID) throws IOException {
//        if (ImageIO.read(multipartFile.getInputStream()) == null) {
//            return new ResponseEntity<>("Image non valid!", HttpStatus.BAD_REQUEST);
//        }
//        Map result = cloudinaryService.upload(multipartFile);
//        Image image = Image.builder()
//                .name((String) result.get("original_filename"))
//                .imageURL((String) result.get("url"))
//                .imageID((String) result.get("public_id"))
//                .type(type)
//                .productID(Objects.equals(productID, "") ? null : productID)
//                .blogID(Objects.equals(blogID,"")?null:blogID)
//                .build();
//        imageService.save(image);
//        return new ResponseEntity<>("image saved ! ", HttpStatus.OK);
//    }
//
//    @PutMapping("/updateImage/{id}")
//    public ResponseEntity<Object> updateImage(@PathVariable String id, @RequestBody Image updatedImageInfo) {
//        Optional<Image> optionalImage = imageService.findById(id);
//        if (optionalImage.isPresent()) {
//            try {
//                Image img = optionalImage.get();
//                if (updatedImageInfo.getName() != null) {
//                    img.setName(updatedImageInfo.getName());
//                }
//                img.setProductID(updatedImageInfo.getProductID());
//                if (updatedImageInfo.getType() != null) {
//                    img.setType(updatedImageInfo.getType());
//                }
//                if (updatedImageInfo.getImageURL() != null) {
////                    String newUrl = updatedImageInfo.getImage().replace("\"", "");
////                    img.setImage(newUrl);
//                    img.setImageURL(updatedImageInfo.getImageURL());
//                }
////                if (updatedImageInfo.getBlogID() != null) {
////                    img.setBlogID(updatedImageInfo.getBlogID());
////                }
//                Image updatedImage = imageService.save(img);
//                return ResponseEntity.status(HttpStatus.CREATED).body(
//                        updatedImage
//                );
//            } catch (Exception e) {
//                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
//                        "Failed to update image"
//                );
//            }
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
//                   "Cannot find image with id=" + id
//            );
//        }
//    }
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Object> deleteImageById (@PathVariable String id)
//    {
//        Optional<Image> optionalImage = imageService.findById(id);
//        if (optionalImage.isPresent()) {
//            try {
//                cloudinaryService.delete(optionalImage.get().getImageID());
//                imageService.delete(id);
//                return ResponseEntity.status(HttpStatus.OK).body(
//                         "Deleted image successfully"
//                );
//            } catch (Exception e) {
//                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
//                       "Failed to delete image"
//                );
//            }
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
//                    "Cannot find image with id=" + id
//            );
//        }
//    }
//}
