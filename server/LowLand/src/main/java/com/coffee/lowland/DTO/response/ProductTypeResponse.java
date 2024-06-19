package com.coffee.lowland.DTO.response;

import com.coffee.lowland.model.ProductType;

import java.util.ArrayList;
import java.util.List;

public class ProductTypeResponse{
    public List<ProductType> data = new ArrayList<>();
    public int pagination;
}
