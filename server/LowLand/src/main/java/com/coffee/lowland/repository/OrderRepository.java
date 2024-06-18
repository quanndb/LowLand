package com.coffee.lowland.repository;

import com.coffee.lowland.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends CrudRepository<Order,Integer> {

    Optional<Order> findByOrderCode(int orderCode);

    @Procedure(name = "spGetOrders")
    List<Order> spGetOrders(
            @Param("searchKeyword") String searchKeyword,
            @Param("pageNumber") int pageNumber,
            @Param("pageSize") int pageSize
    );

}
