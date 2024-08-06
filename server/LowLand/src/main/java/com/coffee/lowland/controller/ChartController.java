package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.service.ChartService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Chart")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ChartController {
    ChartService _service;
    @GetMapping("/GetToltalMoneyDayinMonth")
    public APIResponse<Object> GetToltalMoneyDayinMonth(@RequestParam int monthInput,@RequestParam int yearInput){
        return APIResponse.<Object>builder()
                .code(2000)
                .result(_service.GetTotalMoneyDayanMonth(monthInput, yearInput))
                .build();
    }

    @GetMapping("/GetTopBestSaleProduct")
    public APIResponse<Object> GetTopBestSaleProduct(@RequestParam int topProduct){
        return APIResponse.<Object>builder()
                .code(2000)
                .result(_service.GetTopProduct(topProduct, 1))
                .build();
    }

    @GetMapping("/GetTopLowSaleProduct")
    public APIResponse<Object> GetTopLowSaleProduct(@RequestParam int topProduct){
        return APIResponse.<Object>builder()
                .code(2000)
                .result(_service.GetTopProduct(topProduct, 0))
                .build();
    }
}
