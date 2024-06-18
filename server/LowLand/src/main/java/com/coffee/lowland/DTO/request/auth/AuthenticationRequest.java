package com.coffee.lowland.DTO.request.auth;

import jakarta.validation.constraints.NotEmpty;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationRequest {
    @NotEmpty(message = "EMAIL_PASSWORD_NULL")
    String email;
    @NotEmpty(message = "EMAIL_PASSWORD_NULL")
    String password;
}
