package com.coffee.lowland.DTO.request;

import com.coffee.lowland.model.Role;
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
public class AccountRegisterRequest {
    @NotEmpty(message = "EMAIL_NULL")
    String email;
    String password;
    Role role;
    String fullName;
}
