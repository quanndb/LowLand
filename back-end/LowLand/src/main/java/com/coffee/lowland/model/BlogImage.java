package com.coffee.lowland.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Document(collection = "blogImage")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BlogImage {
    ObjectId _id;
    String blogId;
    String hexString;
    String fileName;
    String imageURL;
    String cloudId;
}
