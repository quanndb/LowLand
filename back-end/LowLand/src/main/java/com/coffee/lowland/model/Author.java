package com.coffee.lowland.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Document(collection = "author")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Author {
    @Id
    String _id;
    String accountId;
    String position;
    String description;
}
