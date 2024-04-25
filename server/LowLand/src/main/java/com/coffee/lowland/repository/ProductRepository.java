package com.coffee.lowland.repository;

import com.coffee.lowland.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
//    Product updateProductById(int id,Product newProduct);
    List<Product> findProductsByProductCode(String codeProduct);
    List <Product> findProductsByProductCodeAndId(String productCode , int id);
//    @Query("SELECT p FROM Product p WHERE p.id <> ?1 AND p.productCode = ?2 limit 1")
//    Product TimKiem(int ID, String ProductCode);

}
