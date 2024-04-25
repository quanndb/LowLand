package com.coffee.lowland.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String imageURL;

    private String type;

    private Integer productID;

    private Integer blogID;

    private String imageID;

    public Image(String name, String imageURL, String publicId, Image image) {
        this.name=name;
        this.imageURL=imageURL;
        this.imageID=publicId;
        this.type=image.getType();
        this.blogID=image.getBlogID();
        this.productID=image.getProductID();
    }

    public Image(String originalFilename, String url, String publicId) {
        this.name = originalFilename;
        this.imageURL = url;
        this.imageID = publicId;
    }

    public Image(String originalFilename, String url, String publicId, String type, Integer productID, Integer blogID) {
        this.name = originalFilename;
        this.imageURL = url;
        this.imageID = publicId;
        this.type = type;
        this.productID = productID;
        this.blogID = blogID;
    }
}
