package com.coffee.lowland.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String productCode;

    private String name;

    private String type;

    private boolean isActive;

    private String description;

//    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
//    private List<Image> images;

}
