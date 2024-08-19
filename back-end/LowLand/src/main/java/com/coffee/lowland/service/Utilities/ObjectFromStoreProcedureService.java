package com.coffee.lowland.service.Utilities;

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
public class ObjectFromStoreProcedureService<T> {
    final EntityManager entityManager;
    public StoredProcedureQuery prepareStore(String storeName, Class<T> responseType) {
        return entityManager
                .createStoredProcedureQuery(storeName, responseType);
    }
    public <K> void addField(StoredProcedureQuery sp, String fieldName, Class<K> typeInput, K value) {
        sp.registerStoredProcedureParameter(fieldName, typeInput, ParameterMode.IN);
        sp.setParameter(fieldName, value);
    }

    @SuppressWarnings("unchecked")
    public List<T> get(StoredProcedureQuery storedProcedureQuery) {
            storedProcedureQuery.execute();
            List<T> resultList = storedProcedureQuery.getResultList();
            return resultList != null ? resultList : List.of();
    }
}
