package com.coffee.lowland.Mongo.repository;

import com.coffee.lowland.model.BlogImage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogImageRepository extends MongoRepository<BlogImage, String> {
    BlogImage findByImageURL(String imageUrl);

    void deleteAllByBlogId(String blogId);
    List<BlogImage> findAllByBlogId(String blogId);
}
