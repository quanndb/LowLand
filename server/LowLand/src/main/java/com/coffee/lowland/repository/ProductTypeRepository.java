package com.coffee.lowland.repository;

import com.coffee.lowland.DTO.response.Pagination;
import com.coffee.lowland.model.Account;
import com.coffee.lowland.model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductTypeRepository extends JpaRepository<ProductType, Integer> {
    //ProductType findbyCode(String code);
    ProductType findByCode(String code);

    @Procedure
    List<ProductType> spGetAllProductType(String keyWord, int pageNumber);
    @Procedure(name = "spGetProductTypes")
    int spGetProductTypes(@Param("keyWord") String keyWord);
}
