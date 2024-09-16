package com.coffee.lowland.JPA.repository;

import com.coffee.lowland.model.Order;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends CrudRepository<Order,String> {

    Optional<Order> findByOrderCode(long orderCode);
}
