package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.productType.ProductSizeDto;
import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.model.Material;
import com.coffee.lowland.model.ProductSize;
import com.coffee.lowland.service.MaterialService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Material")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class MaterialController {
    MaterialService _service;
    @GetMapping("/GetAll")
    public APIResponse<Object> GetAll(){
        List<Material> data = _service.GetAll();
        return APIResponse.<Object>builder()
                .code(2000)
                .result(data)
                .build();
    }
    @GetMapping("/GetById")
    public APIResponse<Object> GetAll(@RequestParam int Id){
        Optional<Material> data = _service.GetById(Id);
        return APIResponse.<Object>builder()
                .code(2000)
                .result(data)
                .build();
    }
    @PostMapping("/CreateOrUpdate")
    public APIResponse<Boolean> CreateOrUpdate(@RequestBody Material data) {
        return APIResponse.<Boolean>builder()
                .code(2000)
                .message("Change success!")
                .result(_service.CreateOrUpdate(data)).build();
    }


    @GetMapping("/Delete")
    public APIResponse<Boolean> Delete(@RequestParam int id){
        return APIResponse.<Boolean>builder()
                .code(2000)
                .result(_service.Delete(id))
                .message("Deleted success!")
                .build();
    }
}
