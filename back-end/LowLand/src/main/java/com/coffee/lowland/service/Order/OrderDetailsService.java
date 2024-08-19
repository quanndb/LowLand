package com.coffee.lowland.service.Order;

import com.coffee.lowland.DTO.request.order.PayOrderItem;
import com.coffee.lowland.DTO.response.order.GetOrderDetailsResponse;
import com.coffee.lowland.service.Utilities.ObjectFromStoreProcedureService;
import jakarta.persistence.StoredProcedureQuery;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderDetailsService {
    ObjectFromStoreProcedureService<GetOrderDetailsResponse> store;
    ObjectFromStoreProcedureService<PayOrderItem> storeForPayment;

    @Transactional
    public List<PayOrderItem> getOrderDetailsForPay(String id){
        StoredProcedureQuery sp = storeForPayment
                .prepareStore("spGetOrderDetails"
                        , PayOrderItem.class);
        storeForPayment.addField(sp, "inputOrderID", String.class, id);
        return storeForPayment.get(sp);
    }

    @Transactional
    public List<GetOrderDetailsResponse> getOrderDetailsByOrderId(String id){
        StoredProcedureQuery sp = store
                .prepareStore("spGetOrderDetailsByOrderId"
                        , GetOrderDetailsResponse.class);
        store.addField(sp, "inputOrderID", String.class, id);
        return store.get(sp);
    }
}
