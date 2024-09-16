package com.coffee.lowland.DTO.response.blog;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DetailsAuthor {
    String accountId;
    String email;
    String fullName;
    int gender;
    String imageName;
    String imageURL;
    String role;
    String position;
    String description;
}
