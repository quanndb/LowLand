package com.coffee.lowland.DTO.response.auth;

import com.coffee.lowland.model.Role;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
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
    String role;
}
