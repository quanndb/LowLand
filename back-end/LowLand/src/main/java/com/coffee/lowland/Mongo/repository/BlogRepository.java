package com.coffee.lowland.Mongo.repository;

import com.coffee.lowland.model.Blog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlogRepository extends MongoRepository<Blog, String> {
    Optional<Blog> findBlogByBlogId(String blogId);
    void deleteByBlogId(String blogId);
    boolean existsByBlogId(String blogId);
}
