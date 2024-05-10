package com.coffee.lowland.repository;

import com.coffee.lowland.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {
    List<Image> findByTypeAndProductID(String type, Integer productID);
    List<Image> findByOrderById();

}
