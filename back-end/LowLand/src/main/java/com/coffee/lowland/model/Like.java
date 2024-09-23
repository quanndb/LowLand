package com.coffee.lowland.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Document(collection = "like")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public class Like {
    ObjectId _id;
    String accountId;
    LocalDateTime likedDate;
    String blogId;
    ObjectId commentId;
    ObjectId parentsId;
    ObjectId replyToId;
}
