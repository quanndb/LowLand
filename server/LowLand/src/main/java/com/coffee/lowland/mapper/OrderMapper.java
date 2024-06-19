package com.coffee.lowland.mapper;

import com.coffee.lowland.DTO.request.order.ApproveOrderRequest;
import com.coffee.lowland.DTO.request.order.CancelOrderRequest;
import com.coffee.lowland.DTO.request.order.CreateOrderRequest;
import com.coffee.lowland.DTO.request.order.UpdateOrderRequest;
import com.coffee.lowland.DTO.response.order.GetOrderResponse;
import com.coffee.lowland.DTO.response.order.OrderDetailsResponse;
import com.coffee.lowland.DTO.response.order.PayResponse;
import com.coffee.lowland.model.Order;
import com.coffee.lowland.model.OrderDetails;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    Order toOrder(CreateOrderRequest request);
    void updateOrder(@MappingTarget Order order, UpdateOrderRequest request);
    void cancelOrder(@MappingTarget Order order, CancelOrderRequest request);
    void approveOrder(@MappingTarget Order order, ApproveOrderRequest request);
    void getOrder(@MappingTarget GetOrderResponse res, Order order);
}
