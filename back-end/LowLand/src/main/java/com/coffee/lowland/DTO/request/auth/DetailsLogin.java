package com.coffee.lowland.DTO.request.auth;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DetailsLogin {
    String IP;
    String userAgent;

    public String toString(){
        return IP+ " "+ userAgent;
    }
}
