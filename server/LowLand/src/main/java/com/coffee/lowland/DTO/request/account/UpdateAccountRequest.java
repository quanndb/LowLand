package com.coffee.lowland.DTO.request.account;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateAccountRequest {
    String fullName;
    String gender;
    String phoneNumber;
    String address;
    String imageUrl;
}
