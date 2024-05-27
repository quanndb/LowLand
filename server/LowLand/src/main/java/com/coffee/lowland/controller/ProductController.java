package com.coffee.lowland.controller;

import com.coffee.lowland.model.Product;
import com.coffee.lowland.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping(path ="/v1/products")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ProductController {

    ProductRepository productRepository;

    @GetMapping("/getAllProducts")
    public ResponseEntity<Object> getAllProducts() {
        Iterable<Product> products = productRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(products);
    }

    @GetMapping("/{id}")
    ResponseEntity<Object> findById(@PathVariable String id) {
        Optional<Product> foundProduct = productRepository.findById(id);
        if(foundProduct.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(foundProduct);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot find product with id=" +id);
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
    public ResponseEntity<Object> addProduct(@RequestBody Product newProduct) {
        List<Product> foundProduct = productRepository.findProductsByProductCode(newProduct.getProductCode());
        if(foundProduct.size() > 0)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Product code already taken");
        }
        else {
            return ResponseEntity.status(HttpStatus.CREATED).body(productRepository.save(newProduct));
        }
    }

    @PutMapping("/updateProduct/{id}")
    public ResponseEntity<Object> updateProduct(@PathVariable String id, @RequestBody Product productDetails) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setName(productDetails.getProductCode());
            product.setName(productDetails.getName());
            product.setType(productDetails.getType());
            product.setActive(productDetails.isActive());
            product.setDescription(productDetails.getDescription());
            Product updatedProduct = productRepository.save(product);
            return ResponseEntity.status(HttpStatus.OK).body(updatedProduct);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot find product with id=" + id);
        }
    }
//nên gộp như thế này
    @PutMapping("/{id}")
    //gộp : khi chưa có sp đó thì tạo mới, khi tồn tại thì update
    ResponseEntity<Object> CreateOrUpdateProduct(@RequestBody Product newProduct)
    {
        List<Product> foundProduct = productRepository.findProductsByProductCode(newProduct.getProductCode());
        if(!Objects.equals(foundProduct.get(0).getId(), ""))
            return ResponseEntity.status(HttpStatus.OK).body("Product code already taken");
        Product updateProduct =  productRepository.findById(newProduct.getId()).map(
                product -> {
                    product.setProductCode(newProduct.getProductCode());
                    product.setName(newProduct.getName());
                    product.setType(newProduct.getType());
                    product.setActive(newProduct.isActive());
                    product.setDescription(newProduct.getDescription());
                    return productRepository.save(product);
                }).orElseGet(() -> {
                    return productRepository.save(newProduct);
        });
        return ResponseEntity.status(HttpStatus.OK).body(updateProduct);
    }
    @DeleteMapping("/deleteProduct/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable String id) {
        boolean exists = productRepository.existsById(id);
        if (exists) {
            productRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Product deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot find product with id=" + id);
        }
    }

    @PutMapping("/setIsActive/{id}")
    public ResponseEntity<Object> setIsActiveById(@PathVariable String id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setActive(!product.isActive());
            Product updatedProduct = productRepository.save(product);
            return ResponseEntity.status(HttpStatus.OK).body(updatedProduct);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot find product with id=" + id);
        }
    }
}
