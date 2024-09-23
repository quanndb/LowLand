package com.coffee.lowland.DTO.response.blog;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Blogs {
    String blogId;
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
