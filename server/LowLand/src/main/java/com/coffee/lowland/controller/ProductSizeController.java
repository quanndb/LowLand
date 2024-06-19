package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.DTO.response.ProductTypeResponse;
import com.coffee.lowland.model.ProductSize;
import com.coffee.lowland.model.ProductType;
import com.coffee.lowland.service.ProductSizeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ProductType")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ProductSizeController {
    ProductSizeService _service;


    @GetMapping("/GetAll")
    public APIResponse<Object> GetAll(@RequestParam String keyWords, @RequestParam int pageNumber){
        ProductTypeResponse data = new ProductTypeResponse();
        data.data = _service.GetAll(keyWords, 1000000000);
        //data.pagination = _service.GetTotalPage(keyWords);

        return APIResponse.<Object>builder()
                .code(2000)
                .result(data)
                .build();
    }

    @PostMapping("/CreateOrUpdate")
    public APIResponse<String> CreateOrUpdate(@RequestBody ProductSize data) {
        String _str = "";
        try {
            int check = _service.CreateOrUpdate(data);
            if(check == 1) _str = "Thêm mới thành công!";
            if(check == 2) _str = "Tên Size đax được sử dụng!";
            if(check == 3) _str = "Không tìm thấy loại size sản phẩm!";
        }
        catch (Exception e){
            _str = "Đã xảy ra lỗi: " + e.getMessage();
        }
        return APIResponse.<String>builder().code(2000).result(_str).build();
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
