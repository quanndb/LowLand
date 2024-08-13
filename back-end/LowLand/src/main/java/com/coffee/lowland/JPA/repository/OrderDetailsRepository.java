package com.coffee.lowland.JPA.repository;

import com.coffee.lowland.DTO.request.order.PayOrderItem;
import com.coffee.lowland.DTO.response.order.GetOrderDetailsResponse;
import com.coffee.lowland.DTO.response.order.GetOrdersResponse;
import com.coffee.lowland.model.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, String> {

    @Procedure
    List<Object[]> spGetOrderDetails(String inputOrderID);

    @Procedure
    List<Object[]> spGetOrderDetailsByOrderId(String inputOrderID);
}
