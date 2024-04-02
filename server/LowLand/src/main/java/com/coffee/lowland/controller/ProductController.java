package com.coffee.lowland.controller;

import com.coffee.lowland.model.Product;
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
    private ProductRepository repository;

    @GetMapping("/getAllProducts")
    public ResponseEntity<Iterable<Product>> getAllProducts(){
        Iterable<Product> products = repository.findAll();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable Integer id) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PostMapping("/addProduct")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product savedProduct = repository.save(product);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    @PutMapping("/updateProduct/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @RequestBody Product productDetails) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        product.setName(productDetails.getName());
        product.setType(productDetails.getType());
        product.setActive(productDetails.isActive());
        product.setDescription(productDetails.getDescription());

        Product updatedProduct = repository.save(product);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }



    @DeleteMapping("/deleteProduct/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        repository.delete(product);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/setIsActive/{id}")
    public ResponseEntity<Product> setIsActiveById(@PathVariable Integer id, @RequestParam boolean isActive) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        product.setActive(isActive);

        Product updatedProduct = repository.save(product);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

}
