package com.coffee.lowland.Mongo.repository;

import com.coffee.lowland.model.Like;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends MongoRepository<Like, String> {
    boolean existsByBlogIdAndAccountId(String blogId, String accountId);
    Optional<Like> findByBlogIdAndAccountId(String blogId, String accountId);

    Optional<Like> findByCommentIdAndAccountId(ObjectId blogId, String accountId);
    long countByBlogId(String blogId);
}
