package com.coffee.lowland.repository;

import com.coffee.lowland.DTO.request.order.PayOrderItem;
import com.coffee.lowland.DTO.response.order.GetOrderDetailsResponse;
import com.coffee.lowland.DTO.response.order.GetOrdersResponse;
import com.coffee.lowland.model.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

import java.util.List;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Integer> {

    @Procedure
    List<Object[]> spGetOrderDetails(int inputOrderID);

    @Procedure
    List<Object[]> spGetOrderDetailsByOrderId(int inputOrderID);
}
