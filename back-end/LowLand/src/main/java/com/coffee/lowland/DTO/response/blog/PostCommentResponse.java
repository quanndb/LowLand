package com.coffee.lowland.DTO.response.blog;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostCommentResponse {
    String _id;
    String accountId;
    LocalDateTime commentedDate;
    String blogId;
    String content;
    String parentsId;
    String commentId;
    String replyTo;
}
