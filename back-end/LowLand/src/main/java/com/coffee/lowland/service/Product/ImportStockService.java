package com.coffee.lowland.service.Product;

import com.coffee.lowland.DTO.request.importStock.CreateImportStockRequest;
import com.coffee.lowland.DTO.response.utilities.PageServiceResponse;
import com.coffee.lowland.DTO.response.importStock.DetailsImportMaterialResponse;
import com.coffee.lowland.DTO.response.importStock.ImportStockDetailsResponse;
import com.coffee.lowland.DTO.response.importStock.ImportStockResponse;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.*;
import com.coffee.lowland.JPA.repository.ImportStockRepository;
import com.coffee.lowland.service.Utilities.PageService;
import com.coffee.lowland.service.Utilities.RandomCodeService;
import jakarta.persistence.StoredProcedureQuery;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Slf4j
public class ImportStockService {
    RandomCodeService _random;
    ImportStockRepository _repo;
    ImportStockDetailsService _detailsService;
    PageService<ImportStockResponse> pageService;

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public ImportStockDetailsResponse getDetails(String id){
         ImportStock found = _repo.findById(id)
                .orElseThrow(() -> new AppExceptions(ErrorCode.PRODUCT_NOT_FOUND));
        List<DetailsImportMaterialResponse> list =_detailsService.getByImportStockId(id);
        long total = 0L;
        for(DetailsImportMaterialResponse item : list){
            total+=item.getTotal();
        }
         return ImportStockDetailsResponse.builder()
                 .importStockId(found.getImportStockId())
                 .importCode(found.getImportCode())
                 .importDate(found.getImportDate())
                 .description(found.getDescription())
                 .materialsList(list)
                 .supplierName(found.getSupplierName())
                 .totalPrice(total)
                 .build();
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    @Transactional
    public PageServiceResponse<ImportStockResponse> getImportStocks(int page, int size, String query,
                                               String providerName, String importDate,
                                               String sortedBy, String sortDirection) {
        StoredProcedureQuery store = pageService.prepareStatement("spGetImportStocks"
                , ImportStockResponse.class, page, size, query, sortedBy, sortDirection);
        pageService.addField(store,"supplier_name", String.class, providerName);
        pageService.addField(store, "import_date", String.class, importDate);
        return pageService.pageResponse(store);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public ImportStockDetailsResponse createImportStock(CreateImportStockRequest request) {
        ImportStock newImport = _repo.save(ImportStock.builder()
                        .importCode(_random.generateCode()+"")
                        .description(request.getDescription())
                        .supplierName(request.getSupplierName())
                        .importDate(LocalDateTime.now())
                .build());
        _detailsService.createDetails(request.getDetails(), newImport.getImportStockId());
        return getDetails(newImport.getImportStockId());
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public ImportStockDetailsResponse updateImport(CreateImportStockRequest request, String id) {
        ImportStock found = _repo.findById(id)
                .orElseThrow(()->new AppExceptions(ErrorCode.IMPORT_NOTFOUND));
        found.setDescription(request.getDescription());
        found.setSupplierName(request.getSupplierName());
        _repo.save(found);
        _detailsService.updateDetails(request.getDetails(), found.getImportStockId());
        return getDetails(id);
    }
}
