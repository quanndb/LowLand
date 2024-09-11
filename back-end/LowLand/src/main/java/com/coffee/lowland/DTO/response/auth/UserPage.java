package com.coffee.lowland.DTO.response.auth;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserPage {
    @Id
    String accountId;
    String email;
    String fullName;
    int gender;
    String phoneNumber;
    String address;
    String imageName;
    String imageURL;
    String cloudId;
    Boolean isActive;
    String role;
}
