package com.coffee.lowland.service.Utilities;

import com.coffee.lowland.DTO.response.PageServiceResponse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PageService<T> {
    final EntityManager entityManager;

    @SuppressWarnings("unchecked")
    public PageServiceResponse<T> pageResponse(StoredProcedureQuery storedProcedureQuery){
        storedProcedureQuery.execute();
        List<T> response = storedProcedureQuery.getResultList();
        Integer totalRecords = (Integer) storedProcedureQuery.getOutputParameterValue("total_records");
        Integer size = (Integer) storedProcedureQuery.getParameterValue("size");
        Integer page = (Integer) storedProcedureQuery.getParameterValue("page") + 1;
        String query = (String) storedProcedureQuery.getParameterValue("query");
        String sortedBy = (String) storedProcedureQuery.getParameterValue("sort_field");
        String sortDirection = (String) storedProcedureQuery.getParameterValue("sort_order");
        int totalPages = (int) Math.ceil((double) totalRecords / size);

        return PageServiceResponse.<T>builder()
                .page(page)
                .size(size)
                .isLast(Objects.equals(page, totalPages))
                .isFirst(Objects.equals(page, 1))
                .query(query)
                .sortedBy(sortedBy)
                .sortDirection(sortDirection)
                .totalRecords(totalRecords)
                .totalPages(totalPages)
                .response(response)
                .build();
    }

    public StoredProcedureQuery prepareStatement(String storeName, Class<T> responseType,
                                                 Integer page, Integer size, String query,
                                                 String sortedBy, String sortDirection) {
        StoredProcedureQuery storedProcedureQuery = entityManager
                .createStoredProcedureQuery(storeName, responseType);
        storedProcedureQuery.registerStoredProcedureParameter("page", Integer.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter("size", Integer.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter("query", String.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter("sort_field", String.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter("sort_order", String.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter("total_records", Integer.class, ParameterMode.OUT);
        storedProcedureQuery.setParameter("page", page - 1);
        storedProcedureQuery.setParameter("size", size);
        storedProcedureQuery.setParameter("query", query);
        storedProcedureQuery.setParameter("sort_field", sortedBy);
        storedProcedureQuery.setParameter("sort_order", sortDirection);
        return storedProcedureQuery;
    }

    public <K> void addField(StoredProcedureQuery sp, String fieldName, Class<K> typeInput, K value) {
        sp.registerStoredProcedureParameter(fieldName, typeInput, ParameterMode.IN);
        sp.setParameter(fieldName, value);
    }
}
