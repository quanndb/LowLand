package com.coffee.lowland.DTO.request.account;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateAccountRequest {
    @NotBlank(message = "USER_FIELDS_NOT_BLANK")
    String email;
    @NotBlank(message = "USER_FIELDS_NOT_BLANK")
    String password;
    @NotBlank(message = "USER_FIELDS_NOT_BLANK")
    String fullName;
    int gender;
    String phoneNumber;
    String address;
    @NotBlank(message = "USER_FIELDS_NOT_BLANK")
    String role;
    String position;
    String description;
}
