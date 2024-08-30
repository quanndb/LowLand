package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.response.utilities.APIResponse;
import com.coffee.lowland.service.Utilities.ChartService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/charts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ChartController {
    ChartService _service;
    @GetMapping("/totalMoneyInMonth")
    public APIResponse<Object> getTotalMoneyInMonth(@RequestParam int monthInput,@RequestParam int yearInput){
        return APIResponse.<Object>builder()
                .code(2000)
                .result(_service.getTotalMoneyInMonth(monthInput, yearInput))
                .build();
    }

    @GetMapping("/totalStuff")
    public APIResponse<?> getTotalStuff(){
        return APIResponse.builder()
                .code(2000)
                .result(_service.getStuff())
                .build();
    }

    @GetMapping("/topSale")
    public APIResponse<Object> getTopSale(@RequestParam int topProduct){
        return APIResponse.<Object>builder()
                .code(2000)
                .result(_service.GetTopProduct(topProduct))
                .build();
    }

    @GetMapping("/materialsChart")
    public APIResponse<Object> getMaterialChart(@RequestParam(required = false, defaultValue = "1") int page,
                                          @RequestParam(required = false, defaultValue = "10") int size,
                                          @RequestParam(required = false, defaultValue = "") String query,
                                          @RequestParam(required = false, defaultValue = "material_name") String sortedBy,
                                          @RequestParam(required = false, defaultValue = "DESC") String sortDirection){
        return APIResponse.<Object>builder()
                .code(2000)
                .result(_service.getMaterialChart(page,size,query, sortedBy, sortDirection))
                .build();
    }
}
