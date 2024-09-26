package com.coffee.lowland.DTO.response.blog;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Blogs {
    String blogId;
    String accountId;
    DetailsAuthor author;
    String categoryName;
    String imageURL;
    String title;
    long views;
    LocalDateTime date;
    LocalDateTime lastUpdate;
    String updatedBy;
    String description;
}
