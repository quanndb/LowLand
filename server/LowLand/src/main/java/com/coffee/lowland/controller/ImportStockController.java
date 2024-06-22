package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.ImportStockDTO;
import com.coffee.lowland.DTO.request.product.ProductDataDto;
import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.model.Product;
import com.coffee.lowland.service.ImportStockDetailsService;
import com.coffee.lowland.service.ImportStockService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/ImportStock")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ImportStockController {
    ImportStockDetailsService _detailsService;
    ImportStockService _service;


    @GetMapping("/GetAll")
    public APIResponse<Object> GetAll(){

        return APIResponse.<Object>builder()
                .code(2000)
                .result(_service.GetAll())
                .build();
    }

    @GetMapping("/GetById")
    public APIResponse<Object> GetById(@RequestParam int Id){
        ImportStockDTO data = new ImportStockDTO();
        data.setData(_service.GetById(Id));
        data.setListDetails(_detailsService.GetAll(Id));

        return APIResponse.<Object>builder()
                .code(2000)
                .result(data)
                .build();
    }
    @PostMapping("/CreateOrUpdate")
    public APIResponse<Boolean> CreateOrUpdate(@RequestBody ImportStockDTO data) throws IOException {
        return APIResponse.<Boolean>builder()
                .code(2000)
                .message("Change success!")
                .result(_service.CreateOrUpdateImportStock(data)).build();
    }

    @GetMapping("/Delete")
    public APIResponse<Boolean> Delete(@RequestParam int Id){
        return APIResponse.<Boolean>builder()
                .code(2000)
                .result(_service.Delete(Id))
                .message("Deleted success!")
                .build();
    }
}
