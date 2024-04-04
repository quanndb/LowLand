package com.coffee.lowland.repository;

import com.coffee.lowland.model.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer> {
//    Product updateProductById(int id,Product newProduct);
    List<Product> findProductsByProductCode(String codeProduct);
}
