package com.coffee.lowland.JPA.repository;

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
public interface OrderRepository extends CrudRepository<Order,String> {

    Optional<Order> findByOrderCode(int orderCode);

    @Procedure
    List<Object[]> spGetAllOrders(String accountId);

    @Procedure
    List<Object[]> spGetAllMeterialIdByOrder(String orderId);
}
