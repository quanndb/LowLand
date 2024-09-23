package com.coffee.lowland.JPA.repository;

import com.coffee.lowland.model.Access;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccessRepository extends JpaRepository<Access, String> {
    @Procedure
    List<Object[]> spGetTotalAccessInMonthOrYear(Integer monthInput, Integer yearInput);
}
