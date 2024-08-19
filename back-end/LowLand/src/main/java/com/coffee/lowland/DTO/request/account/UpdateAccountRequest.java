package com.coffee.lowland.DTO.request.account;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UpdateAccountRequest {
    String fullName;
    String gender;
    String phoneNumber;
    String address;
    String imageURL;
    String imageName;
    String cloudId;
}
