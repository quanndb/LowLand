package com.coffee.lowland.service.Utilities;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class JSONMapper {
    ObjectMapper mapper;
    public <T> T JSONToObject(String JSON, Class<T> type) throws JsonProcessingException {
        return mapper.readValue(JSON, type);
    }
}
