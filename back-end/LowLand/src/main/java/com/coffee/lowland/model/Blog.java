package com.coffee.lowland.model;

import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Document(collection = "blog")
public class Blog {
    @Id
    ObjectId _id;
    String blogId;
    String accountId;
    String categoryName;
    long views;
    String imageURL;
    Boolean isActive;
    String title;
    LocalDateTime date;
    LocalDateTime lastUpdate;
    String updatedBy;
    String description;
    List<BlogContent> content;
}
