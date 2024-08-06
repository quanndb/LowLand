package com.coffee.lowland.service;

import com.coffee.lowland.DTO.response.PageServiceResponse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PageService<T> {
    EntityManager entityManager;

    public PageServiceResponse<T> pageResponse(String storeName, Class<T> responseType,
                                            Integer page, Integer size, String query,
                                            String itemId, Boolean isActive, String typeId){
        StoredProcedureQuery storedProcedureQuery = entityManager
                .createStoredProcedureQuery(storeName, responseType);
        storedProcedureQuery.registerStoredProcedureParameter
                ("page", Integer.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter
                ("size", Integer.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter
                ("query", String.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter
                ("item_id", String.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter
                ("is_active", Boolean.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter
                ("type_id", String.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter
                ("total_records", Integer.class, ParameterMode.OUT);
        storedProcedureQuery.setParameter("page", page);
        storedProcedureQuery.setParameter("size", size);
        storedProcedureQuery.setParameter("query", query);
        storedProcedureQuery.setParameter("item_id", itemId);
        storedProcedureQuery.setParameter("is_active", isActive);
        storedProcedureQuery.setParameter("type_id", typeId);
        storedProcedureQuery.execute();
        List<?> response = storedProcedureQuery.getResultList();
        Integer totalRecords = (Integer) storedProcedureQuery
                .getOutputParameterValue("total_records");
        return PageServiceResponse.<T>builder()
                .page(page)
                .size(size)
                .query(query)
                .totalRecords(totalRecords)
                .totalPages((int) Math.ceil((double) totalRecords / size))
                .response(response)
                .build();
    }
}
