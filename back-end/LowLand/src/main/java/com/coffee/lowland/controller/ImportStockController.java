package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.importStock.CreateImportStockRequest;
import com.coffee.lowland.DTO.response.importStock.ImportStockDetailsResponse;
import com.coffee.lowland.DTO.response.importStock.ImportStockResponse;
import com.coffee.lowland.DTO.response.utilities.APIResponse;
import com.coffee.lowland.DTO.response.utilities.PageServiceResponse;
import com.coffee.lowland.service.Product.ImportStockService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/importStocks")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ImportStockController {
    ImportStockService _service;

    @GetMapping
    public APIResponse<PageServiceResponse<ImportStockResponse>> getImportStocks(
            @RequestParam(required = false, defaultValue = "1") int page,
            @RequestParam(required = false, defaultValue = "10") int size,
            @RequestParam(required = false, defaultValue = "") String query,
            @RequestParam(required = false, defaultValue = "") String providerName,
            @RequestParam(required = false, defaultValue = "") String importDate,
            @RequestParam(required = false, defaultValue = "import_stock_id") String sortedBy,
            @RequestParam(required = false, defaultValue = "DESC") String sortDirection)
    {

        return APIResponse.<PageServiceResponse<ImportStockResponse>>builder()
                .code(2000)
                .result(_service.getImportStocks(page,size,query,providerName,importDate,sortedBy,sortDirection))
                .build();
    }

    @GetMapping("/{id}")
    public APIResponse<ImportStockDetailsResponse> getDetails(@PathVariable String id){
        return APIResponse.<ImportStockDetailsResponse>builder()
                .code(2000)
                .result(_service.getDetails(id))
                .build();
    }

    @PostMapping
    public APIResponse<ImportStockDetailsResponse > createImport(@RequestBody CreateImportStockRequest request){
        return APIResponse.<ImportStockDetailsResponse>builder()
                .code(2000)
                .result(_service.createImportStock(request))
                .build();
    }

    @PutMapping("/{id}")
    public APIResponse<ImportStockDetailsResponse> updateImport(@RequestBody CreateImportStockRequest request,
                                       @PathVariable String id){
        return APIResponse.<ImportStockDetailsResponse>builder()
                .code(2000)
                .result(_service.updateImport(request, id))
                .build();
    }
}
