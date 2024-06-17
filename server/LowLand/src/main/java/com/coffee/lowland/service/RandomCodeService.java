package com.coffee.lowland.service;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicLong;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RandomCodeService {
    final AtomicLong counter = new AtomicLong(System.currentTimeMillis() % 1000000000);

    public String generateCode() {
        long uniqueNumber = counter.incrementAndGet() % 100000000;
        return String.format("%08d", uniqueNumber);
    }
}
