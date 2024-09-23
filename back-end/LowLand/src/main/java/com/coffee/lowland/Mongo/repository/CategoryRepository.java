package com.coffee.lowland.Mongo.repository;

import com.coffee.lowland.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {
    Page<Category> findByNameContainsIgnoreCase(String query, Pageable page);
    List<Category> findByNameContainsIgnoreCase(String query);

    Optional<Category> findByNameIgnoreCase(String name);
}
