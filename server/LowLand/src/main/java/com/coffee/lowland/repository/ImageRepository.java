package com.coffee.lowland.repository;

import com.coffee.lowland.model.Image;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends CrudRepository<Image, Integer> {
//    List<Image> findByType(String type);
//    List<Image> findProductByName(String name);
List<Image> findByTypeAndProductID(String type, Integer productID);

}
