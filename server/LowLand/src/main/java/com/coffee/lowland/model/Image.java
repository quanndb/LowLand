package com.coffee.lowland.model;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String name;
    String imageURL;
    String type;
    String productID;
    String blogID;
    String imageID;

    public Image() {

    }
}
