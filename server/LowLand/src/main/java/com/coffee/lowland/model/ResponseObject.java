package com.coffee.lowland.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseObject {
    private String status;
    private String message;
    private  Object data;

    public ResponseObject(String status, String message, Object data)
    {
        this.status=status;
        this.message=message;
        this.data=data;
    }
}
