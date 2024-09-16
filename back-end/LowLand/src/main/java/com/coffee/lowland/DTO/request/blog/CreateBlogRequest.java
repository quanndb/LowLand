package com.coffee.lowland.DTO.request.blog;

import com.coffee.lowland.model.BlogContent;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.bson.types.ObjectId;

import java.util.List;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateBlogRequest {
    ObjectId categoryId;
    String imageURL;
    String title;
    String description;
    List<BlogContent> content;
}
