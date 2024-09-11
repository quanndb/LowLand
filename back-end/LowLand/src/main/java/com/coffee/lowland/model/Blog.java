package com.coffee.lowland.model;


import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Document(collection = "blog")
public class Blog {
    @Id
    String _id;
    String blogId;
    String accountId;
    String categoryId;
    String imageURL;
    Boolean isActive;
    String title;
    LocalDateTime date;
    LocalDateTime lastUpdate;
    String updatedBy;
    String description;
    List<BlogContent> content;
}
