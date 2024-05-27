package com.coffee.lowland.controller;

import com.coffee.lowland.model.Greeting;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/v1")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class CustomerGreetingController {

    static String greetingTemplate = "Hello, %s %s";

    AtomicInteger counter = new AtomicInteger();

    @GetMapping("/greeting")
    public Greeting greeting (@RequestParam(value = "gender",defaultValue = "0") boolean gender,
                              @RequestParam(value = "customerName",defaultValue = "customer") String customer){
        return Greeting.builder()
                .id(counter.incrementAndGet())
                .content(String.format(greetingTemplate,gender?"Mr.":"Mss.",customer))
                .build();
    }
}
