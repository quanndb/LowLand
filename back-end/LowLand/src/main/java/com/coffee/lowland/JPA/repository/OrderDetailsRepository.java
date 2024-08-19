package com.coffee.lowland.JPA.repository;

import com.coffee.lowland.model.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;


@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, String> {
}
