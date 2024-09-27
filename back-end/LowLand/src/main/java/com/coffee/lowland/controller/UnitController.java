package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.response.utilities.APIResponse;
import com.coffee.lowland.model.Material;
import com.coffee.lowland.model.Unit;
import com.coffee.lowland.service.Product.UnitService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/units")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class UnitController {
    UnitService unitService;
    @GetMapping("")
    public APIResponse<List<Unit>> getMaterials(@RequestParam(required = false, defaultValue = "") String query,
                                                @RequestParam(required = false) Integer size){
        return APIResponse.<List<Unit>>builder()
                .code(2000)
                .result(unitService.getUnits(query))
                .build();
    }
}
