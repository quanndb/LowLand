package com.coffee.lowland.DTO.response.blog;

import com.coffee.lowland.model.BlogContent;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlogDetails {
    String blogId;
    DetailsAuthor author;
    ObjectId categoryId;
    String imageURL;
    String title;
    LocalDateTime date;
    LocalDateTime lastUpdate;
    String updatedBy;
    String description;
    List<BlogContent> content;
}
