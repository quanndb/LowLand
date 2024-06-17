package com.coffee.lowland.mapper;

import com.coffee.lowland.DTO.request.order.CreateOrderRequest;
import com.coffee.lowland.DTO.response.order.CreateOrderResponse;
import com.coffee.lowland.DTO.response.order.OrderDetailsResponse;
import com.coffee.lowland.model.Order;
import com.coffee.lowland.model.OrderDetails;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    Order toOrder(CreateOrderRequest request);
    List<OrderDetailsResponse> toListOrderDetailsResponse(List<OrderDetails> request);
}
