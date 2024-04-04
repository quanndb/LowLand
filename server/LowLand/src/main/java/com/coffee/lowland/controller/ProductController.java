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
@RequestMapping(path ="/v1/products")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ImageRepository imageRepository;

    @GetMapping("/getAllProducts")
    public ResponseEntity<ResponseObject> getAllProducts() {
        Iterable<Product> products = productRepository.findAll();
        ResponseObject responseObject = new ResponseObject("ok", "Retrieved all products successfully", products);
        return ResponseEntity.status(HttpStatus.OK).body(responseObject);
    }

    @GetMapping("/{id}")
    ResponseEntity<ResponseObject> findById(@PathVariable Integer id) {
        Optional<Product> foundProduct = productRepository.findById(id);
        if(foundProduct.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "query product successfully", foundProduct)
            );
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("flase","Cannot find product with id=" +id, "" )
            );
        }
    }

//    @GetMapping("/{id}/images")
//    public ResponseEntity<ResponseObject> getProductImages(@PathVariable Integer id) {
//        Optional<Product> foundProduct = repository.findById(id);
//        if (foundProduct.isPresent()) {
//            List<Image> productImages = foundProduct.get().getImagesById(id);
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new ResponseObject("ok", "Retrieved all images of the product successfully", productImages)
//            );
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
//                    new ResponseObject("false", "Cannot find product with id=" + id, "")
//            );
//        }
//    }


    @PostMapping("/addProduct")
    public ResponseEntity<ResponseObject> addProduct(@RequestBody Product newProduct) {
        List<Product> foundProduct = productRepository.findProductsByProductCode(newProduct.getProductCode());
        if(foundProduct.size() > 0)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("false", "Product code already taken", "")
            );
        }
        else {
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseObject("ok", "Product inserted successfully", productRepository.save(newProduct))
            );
        }
    }

    @PutMapping("/updateProduct/{id}")
    public ResponseEntity<ResponseObject> updateProduct(@PathVariable Integer id, @RequestBody Product productDetails) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setName(productDetails.getProductCode());
            product.setName(productDetails.getName());
            product.setType(productDetails.getType());
            product.setActive(productDetails.isActive());
            product.setDescription(productDetails.getDescription());
            Product updatedProduct = productRepository.save(product);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Product updated successfully", updatedProduct)
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("false","Cannot find product with id=" + id, "")
            );
        }
    }

//    @PutMapping("/{id}")
//    //gộp : khi chưa có sp đó thì tạo mới, khi tồn tại thì update
//    ResponseEntity<ResponseObject> updateProduct(@RequestBody Product newProduct, @PathVariable Integer id)
//    {
//        Product updateProduct =  repository.findById(id).map(
//                product -> {
//                    product.setName(newProduct.getName());
//                    product.setType(newProduct.getType());
//                    product.setActive(newProduct.isActive());
//                    product.setDescription(newProduct.getDescription());
//                    return repository.save(product);
//                }).orElseGet(() -> {
////                    newProduct.setId(id);
//                    return repository.save(newProduct);
//        });
//        return ResponseEntity.status(HttpStatus.OK).body(
//                new ResponseObject("ok", "Updated Product Sucessfully", updateProduct)
//        );
//    }
    @DeleteMapping("/deleteProduct/{id}")
    public ResponseEntity<ResponseObject> deleteProduct(@PathVariable Integer id) {
        boolean exists = productRepository.existsById(id);
        if (exists) {
            productRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(
                    new ResponseObject("ok", "Product deleted successfully", "")
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("false","Cannot find product with id=" + id, "")
            );
        }
    }

    @PutMapping("/setIsActive/{id}")
    public ResponseEntity<ResponseObject> setIsActiveById(@PathVariable Integer id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setActive(!product.isActive());
            Product updatedProduct = productRepository.save(product);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Updated product's isActive successfully", updatedProduct)
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("false","Cannot find product with id=" + id, "")
            );
        }
    }



//    @GetMapping("/imagesProduct")
//    public ResponseEntity<ResponseObject> getAllProductImages() {
//        Iterable<Product> allProducts = repository.findAll();
//        List<Image> allProductImages = new ArrayList<>();
//
//        for (Product product : allProducts) {
//            List<Image> productImages = imageRepository.findByTypeAndProductID("product", product.getId());
//            allProductImages.addAll(productImages);
//        }
//
//        return ResponseEntity.status(HttpStatus.OK).body(
//                new ResponseObject("ok", "Retrieved all images of all products successfully", allProductImages)
//        );
//    }

//    @DeleteMapping("/{productId}/deleteImage/{imageId}")
//    public ResponseEntity<ResponseObject> deleteImageOfProduct(@PathVariable Integer productId, @PathVariable Integer imageId) {
//        try {
//            // Kiểm tra xem sản phẩm có tồn tại không
//            Optional<Product> optionalProduct = productRepository.findById(productId);
//            if (optionalProduct.isPresent()) {
//                // Kiểm tra xem ảnh cần xóa có tồn tại không
//                Optional<Image> optionalImage = imageRepository.findById(imageId);
//                if (optionalImage.isPresent()) {
//                    Image image = optionalImage.get();
//                    // Kiểm tra xem ảnh thuộc về sản phẩm nào
//                    if (image.getProductID() == productId) {
//                        // Xóa ảnh
//                        imageRepository.delete(image);
//                        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(
//                                new ResponseObject("ok", "Image deleted successfully", "")
//                        );
//                    } else {
//                        // Nếu ảnh không thuộc về sản phẩm này, trả về lỗi
//                        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
//                                new ResponseObject("false", "Image with id=" + imageId + " does not belong to product with id=" + productId, "")
//                        );
//                    }
//                } else {
//                    // Nếu không tìm thấy ảnh, trả về lỗi
//                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
//                            new ResponseObject("false", "Cannot find image with id=" + imageId, "")
//                    );
//                }
//            } else {
//                // Nếu không tìm thấy sản phẩm, trả về lỗi
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
//                        new ResponseObject("false", "Cannot find product with id=" + productId, "")
//                );
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
//                    new ResponseObject("false", "Failed to delete image", e.getMessage())
//            );
//        }
//    }
}
