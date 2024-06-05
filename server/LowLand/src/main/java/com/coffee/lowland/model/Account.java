package com.coffee.lowland.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


@Entity
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int accountID;
    String email;
    String password;
    String fullName;
    int gender;
    String phoneNumber;
    String address;
    String createdDate;
    String createdBy;
    String updatedDate;
    String updatedBy;
    @Enumerated(value = EnumType.STRING)
    Role role;
}
