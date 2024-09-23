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
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Document(collection = "comment")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Comment {
    ObjectId _id;
    String accountId;
    LocalDateTime commentedDate;
    String blogId;
    ObjectId parentsId;
    ObjectId commentId;
    LocalDateTime updatedDate;
    String updatedBy;
    String replyTo;
    String content;
}
