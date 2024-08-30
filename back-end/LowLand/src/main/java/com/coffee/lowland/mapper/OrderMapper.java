package com.coffee.lowland.mapper;

import com.coffee.lowland.DTO.request.order.ApproveOrderRequest;
import com.coffee.lowland.DTO.request.order.CreateOrderRequest;
import com.coffee.lowland.DTO.request.order.UpdateOrderRequest;
import com.coffee.lowland.DTO.response.order.GetOrderResponse;
import com.coffee.lowland.model.Order;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;


@Mapper(componentModel = "spring")
public interface OrderMapper {
    Order toOrder(CreateOrderRequest request);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateOrder(@MappingTarget Order order, UpdateOrderRequest request);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void approveOrder(@MappingTarget Order order, ApproveOrderRequest request);
    void getOrder(@MappingTarget GetOrderResponse res, Order order);
}
