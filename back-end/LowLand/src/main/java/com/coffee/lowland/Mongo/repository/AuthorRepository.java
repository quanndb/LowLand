package com.coffee.lowland.Mongo.repository;

import com.coffee.lowland.model.Author;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthorRepository extends MongoRepository<Author, String> {
    Optional<Author> findByAccountId(String accountId);
}
