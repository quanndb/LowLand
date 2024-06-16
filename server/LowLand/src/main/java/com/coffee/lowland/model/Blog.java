package com.coffee.lowland.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Entity
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int blogId;
    String title;
    String content;
    String imageUrl;
    LocalDateTime createdDate;
    String createdBy;
    LocalDateTime updatedDate;
    String updatedBy;
}
