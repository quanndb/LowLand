package com.coffee.lowland.DTO.response.auth;

import com.coffee.lowland.model.Role;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String accountId;
    String email;
    String fullName;
    int gender;
    String phoneNumber;
    String address;
    String imageURL;
    Role role;
}
