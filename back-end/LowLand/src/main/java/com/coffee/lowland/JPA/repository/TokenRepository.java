package com.coffee.lowland.JPA.repository;

import com.coffee.lowland.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TokenRepository extends JpaRepository<Token, String> {
    List<Token> findByAccountIdAndLogout (String accountId, boolean logout);
}
