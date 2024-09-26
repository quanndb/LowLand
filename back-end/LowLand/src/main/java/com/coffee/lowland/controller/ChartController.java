package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.chart.ChartTopBestSale;
import com.coffee.lowland.DTO.chart.ChartTotalMoney;
import com.coffee.lowland.DTO.request.auth.DetailsLogin;
import com.coffee.lowland.DTO.response.utilities.APIResponse;
import com.coffee.lowland.DTO.response.utilities.ChartAccessResponse;
import com.coffee.lowland.DTO.response.utilities.PageServiceResponse;
import com.coffee.lowland.DTO.response.utilities.StoreStuff;
import com.coffee.lowland.model.Access;
import com.coffee.lowland.model.Material;
import com.coffee.lowland.service.Utilities.ChartService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/charts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ChartController {
    ChartService _service;
    @GetMapping("/totalMoneyInMonth")
    public APIResponse<List<ChartTotalMoney>> getTotalMoneyInMonth(@RequestParam int monthInput, @RequestParam int yearInput){
        return APIResponse.<List<ChartTotalMoney>>builder()
                .code(2000)
                .result(_service.getTotalMoneyInMonth(monthInput, yearInput))
                .build();
    }

    @GetMapping("/totalStuff")
    public APIResponse<StoreStuff> getTotalStuff(){
        return APIResponse.<StoreStuff>builder()
                .code(2000)
                .result(_service.getStuff())
                .build();
    }

    @GetMapping("/topSale")
    public APIResponse<List<ChartTopBestSale>> getTopSale(@RequestParam int topProduct){
        return APIResponse.<List<ChartTopBestSale>>builder()
                .code(2000)
                .result(_service.GetTopProduct(topProduct))
                .build();
    }

    @GetMapping("/materialsChart")
    public APIResponse<PageServiceResponse<Material>> getMaterialChart(@RequestParam(required = false, defaultValue = "1") int page,
                                                                       @RequestParam(required = false, defaultValue = "10") int size,
                                                                       @RequestParam(required = false, defaultValue = "") String query,
                                                                       @RequestParam(required = false, defaultValue = "material_name") String sortedBy,
                                                                       @RequestParam(required = false, defaultValue = "DESC") String sortDirection){
        return APIResponse.<PageServiceResponse<Material>>builder()
                .code(2000)
                .result(_service.getMaterialChart(page,size,query, sortedBy, sortDirection))
                .build();
    }

    @GetMapping("/totalAccessHistories")
    public APIResponse<List<ChartAccessResponse>> getTotalAccessHistory(@RequestParam(required = false) Integer month,
                                                                        @RequestParam Integer year){
        return APIResponse.<List<ChartAccessResponse>>builder()
                .code(2000)
                .result(_service.getTotalAccessInMonthOrYear(month, year))
                .build();
    }
    @GetMapping("/accessHistories")
    public APIResponse<PageServiceResponse<Access>> getAccessHistory(@RequestParam(required = false, defaultValue = "1") int page,
                                                                     @RequestParam(required = false, defaultValue = "10") int size,
                                                                     @RequestParam(required = false, defaultValue = "") String query,
                                                                     @RequestParam(required = false, defaultValue = "date") String sortedBy,
                                                                     @RequestParam(required = false, defaultValue = "DESC") String sortDirection,
                                                                     @RequestParam(required = false) Integer month,
                                                                     @RequestParam Integer year){
        return APIResponse.<PageServiceResponse<Access>>builder()
                .code(2000)
                .result(_service.getTotalAccess(page,size,query, sortedBy, sortDirection, month, year))
                .build();
    }


    @PostMapping("/accessHistories")
    public APIResponse<String> postAccessHistory(HttpServletRequest details){
        DetailsLogin detailsLogin = DetailsLogin.builder()
                .IP(details.getRemoteAddr())
                .userAgent(details.getHeader("User-Agent"))
                .build();
        return APIResponse.<String>builder()
                .code(2000)
                .result(_service.postAccess(detailsLogin, null))
                .build();
    }
}
