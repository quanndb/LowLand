package com.coffee.lowland.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Greeting {

    private long id;

    private String content;
}
