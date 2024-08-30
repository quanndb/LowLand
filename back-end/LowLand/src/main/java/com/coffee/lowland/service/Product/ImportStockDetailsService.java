package com.coffee.lowland.service.Product;

import com.coffee.lowland.DTO.request.importStock.DetailsImportStockRequest;
import com.coffee.lowland.DTO.response.importStock.DetailsImportMaterialResponse;
import com.coffee.lowland.model.ImportStockDetails;
import com.coffee.lowland.JPA.repository.ImportStockDetailsRepository;
import com.coffee.lowland.model.Material;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Slf4j
public class ImportStockDetailsService {
    ImportStockDetailsRepository _repo;
    MaterialService materialService;

    public List<DetailsImportMaterialResponse> getByImportStockId(String ImportStockID){
        List<ImportStockDetails> list = _repo.
                findAllByImportStockId(ImportStockID);

        return list.stream()
                .map(item-> {
                    Material found = materialService.getMaterialByName(item.getMaterialName());
                    return DetailsImportMaterialResponse.builder()
                            .importStockId(item.getImportStockId())
                            .detailsId(item.getDetailsId())
                            .price(item.getPrice().longValue())
                            .total((long)(item.getPrice()*item.getQuantity()))
                            .materialName(item.getMaterialName())
                            .unitName(found.getUnitName())
                            .description(found.getDescription())
                            .quantity(item.getQuantity().longValue())
                            .build();
                })
                .collect(Collectors.toList());
    }

    public void createDetails(List<DetailsImportStockRequest> request, String importStockId){
        for(DetailsImportStockRequest item : request){
            Material material = materialService
                    .getOrCreateMaterialByName(item.getMaterialName(),
                            item.getUnitName(),item.getQuantity().doubleValue(), item.getDescription());
            _repo.save(ImportStockDetails.builder()
                            .importStockId(importStockId)
                            .price(item.getPrice().doubleValue())
                            .quantity(item.getQuantity().doubleValue())
                            .description(item.getDescription())
                            .materialName(material.getMaterialName())
                    .build());
        }
    }

    @Transactional
    public void updateDetails(List<DetailsImportStockRequest> request, String importStockId){
        List<ImportStockDetails> list = _repo.findAllByImportStockId(importStockId);
        for(ImportStockDetails item : list){
            materialService
                    .getOrCreateMaterialByName(item.getMaterialName(),
                            null, -item.getQuantity(), item.getDescription());
        }
        _repo.deleteAllByImportStockId(importStockId);
        createDetails(request, importStockId);
    }
}
