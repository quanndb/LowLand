package com.coffee.lowland.DTO.request.auth;

import jakarta.validation.constraints.NotBlank;
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
    @NotBlank(message = "EMAIL_PASSWORD_BLANK")
    String email;
    @NotBlank(message = "EMAIL_PASSWORD_BLANK")
    String password;
}
