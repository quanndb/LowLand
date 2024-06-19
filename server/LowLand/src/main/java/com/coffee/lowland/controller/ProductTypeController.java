package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.response.APIResponse;

import com.coffee.lowland.DTO.response.ProductTypeResponse;
import com.coffee.lowland.model.ProductType;
import com.coffee.lowland.service.ProductTypeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/ProductType")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ProductTypeController {
    ProductTypeService _service;

    @GetMapping("/GetAll")
    public APIResponse<Object> GetAll(@RequestParam String keyWords, @RequestParam int pageNumber){
        ProductTypeResponse data = new ProductTypeResponse();
        data.data = _service.GetAll(keyWords, 1);
        //data.pagination = _service.GetTotalPage(keyWords);

        return APIResponse.<Object>builder()
                .code(2000)
                .result(data)
                .build();
    }

    @PostMapping("/CreateOrUpdate")
    public APIResponse<Boolean> CreateOrUpdate(@RequestBody ProductType data) {
        return APIResponse.<Boolean>builder()
                .code(2000)
                .message("Change success!")
                .result(_service.CreateOrUpdate(data)).build();
    }


    @GetMapping("/Delete")
    public APIResponse<String> Delete(@RequestParam int id){
        _service.Delete(id);
        String _str = "Xóa thành công!";
        return APIResponse.<String>builder()
                .code(2000)
                .result(_str)
                .build();
    }
}
