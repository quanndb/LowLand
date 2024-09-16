package com.coffee.lowland.Mongo.repository;

import com.coffee.lowland.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
    long countByBlogId(String blogId);
}
