package com.coffee.lowland.DTO.request.account;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChangeAccountRequest {
    String accountId;
    String fullName;
    int gender;
    String phoneNumber;
    String address;
    String imageURL;
}
