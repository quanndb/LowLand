package com.coffee.lowland.service.Utilities;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class JSONMapper<T> {
    Class<T> type;
    ObjectMapper mapper = new ObjectMapper();

    public T JSONToObject(String JSON) throws JsonProcessingException {
        return mapper.readValue(JSON, type);
    }
}
