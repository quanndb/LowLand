package com.coffee.lowland.DTO.request.account;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UpdateAccountRequest {
    @NotEmpty(message = "USER_FIELDS_NOT_BLANK")
    String fullName;
    String password;
    int gender;
    String phoneNumber;
    String address;
    String imageURL;
    String imageName;
    String cloudId;
    Boolean isActive;
}
