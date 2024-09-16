package com.coffee.lowland.DTO.request.account;

import jakarta.validation.constraints.Email;
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
public class AccountRegisterRequest {
    @NotBlank(message = "FIELD_NOT_BLANK")
    @Email(message = "INVALID_EMAIL")
    String email;
    @NotBlank(message = "FIELD_NOT_BLANK")
    String password;
    @NotBlank(message = "FIELD_NOT_BLANK")
    String fullName;
    @NotBlank(message = "FIELD_NOT_BLANK")
    String phoneNumber;
}
