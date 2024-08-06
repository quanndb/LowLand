package com.coffee.lowland.service;

import com.coffee.lowland.DTO.request.order.PayOrderItem;
import com.coffee.lowland.DTO.response.order.GetOrderDetailsResponse;
import com.coffee.lowland.model.OrderDetails;
import com.coffee.lowland.repository.OrderDetailsRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderDetailsService {
    OrderDetailsRepository orderDetailsRepository;
    @Transactional
    public List<Object[]> getOrderDetails(String id){
        return orderDetailsRepository.spGetOrderDetails(id);
    }

    @Transactional
    public List<GetOrderDetailsResponse> getOrderDetailsByOrderId(String id){
        List<Object[]> request = orderDetailsRepository.spGetOrderDetailsByOrderId(id);
        List<GetOrderDetailsResponse> responses = new ArrayList<>();
        for(Object[] item : request){
            responses.add(
                    GetOrderDetailsResponse.builder()
                            .productName((String) item[0])
                            .sizeName((String) item[1])
                            .quantity((int) item[2])
                            .price(((BigDecimal) item[3]).floatValue())
                            .totalMoney(((BigDecimal) item[4]).floatValue())
                            .imageUrl((String) item[5])
                            .build()
            );
        }
        return responses;
    }
}
