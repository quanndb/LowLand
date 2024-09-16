package com.coffee.lowland.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String accountId;
    String email;
    String password;
    String fullName;
    int gender;
    String phoneNumber;
    String address;
    @Enumerated(value = EnumType.STRING)
    Role role;
    String imageName;
    String imageURL;
    String cloudId;
    Boolean isActive;
}
