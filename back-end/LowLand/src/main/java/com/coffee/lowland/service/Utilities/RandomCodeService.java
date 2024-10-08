package com.coffee.lowland.service.Utilities;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Component;

import java.util.concurrent.atomic.AtomicLong;

@Component
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RandomCodeService {
    final AtomicLong counter = new AtomicLong(System.currentTimeMillis() % 1000000000);

    public int generateCode() {
        long uniqueNumber = counter.incrementAndGet() % 100000000;
        return  Integer.parseInt(String.format("%08d", uniqueNumber));
    }
}
