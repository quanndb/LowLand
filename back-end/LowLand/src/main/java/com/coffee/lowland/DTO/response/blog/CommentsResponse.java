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
public class CommentsResponse {
    String _id;
    String accountId;
    String email;
    String imageURL;
    LocalDateTime commentedDate;
    String blogId;
    String commentId;
    String replyTo;
    String parentsId;
    String content;
    long totalLikes;
    long totalComments;
    boolean isLiked;
}
