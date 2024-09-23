package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.response.material.MaterialDTO;
import com.coffee.lowland.DTO.response.utilities.APIResponse;
import com.coffee.lowland.model.Material;
import com.coffee.lowland.service.Product.MaterialService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/materials")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class MaterialController {

    MaterialService _service;

    @GetMapping("")
    public APIResponse<List<Material>> getMaterials(@RequestParam(required = false, defaultValue = "") String query,
                                                   @RequestParam(required = false) Integer size){
        return APIResponse.<List<Material>>builder()
                .code(2000)
                .result(_service.getAllByQuery(query, size))
                .build();
    }

    @GetMapping("/{typeId}")
    public APIResponse<Material> getByTypeId(@PathVariable String typeId){
        return APIResponse.<Material>builder()
                .code(2000)
                .result(_service.getMaterialById(typeId))
                .build();
    }

    @PutMapping("/{id}")
    public APIResponse<Material> update(@RequestBody MaterialDTO data,
                                 @PathVariable String id) {
        return APIResponse.<Material>builder()
                .code(2000)
                .message("Change success!")
                .result(_service.updateMaterial(id,data))
                .build();
    }

    @DeleteMapping("/{typeId}")
    public APIResponse<Boolean> deleteType(@PathVariable String typeId){
        return APIResponse.<Boolean>builder()
                .code(2000)
                .result(_service.deleteMaterial(typeId))
                .message("Deleted success!")
                .build();
    }
}
