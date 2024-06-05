package com.coffee.lowland.repository;


import com.coffee.lowland.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    Optional<Account> findAccountByEmail(String email);
    @Procedure(name = "spGetAccountByAccountID")
    List<Account> spGetAccountByAccountID(int id);
}
