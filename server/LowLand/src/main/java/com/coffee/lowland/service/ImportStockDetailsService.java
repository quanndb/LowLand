package com.coffee.lowland.service;

import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.ProductTypeMapper;
import com.coffee.lowland.model.ImportStockDetails;
import com.coffee.lowland.model.ProductDetails;
import com.coffee.lowland.repository.ImportStockDetailsRepository;
import com.coffee.lowland.repository.ProductDetailsRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Slf4j
public class ImportStockDetailsService {
    ImportStockDetailsRepository _repo;

    public Optional<List<ImportStockDetails>> GetAll(int ProductId){
        Optional<List<ImportStockDetails>> lst = _repo.findAllByImportStockId(ProductId);
        return lst;
    }

    public boolean Create(List<ImportStockDetails> data){
        int ImportStockId = data.get(0).getImportStockId();
        Optional<List<ImportStockDetails>> lst = GetAll(ImportStockId);
        if(lst.isPresent()){
            for( int i =0; i < lst.get().size(); i++){
                Delete(lst.get().get(i).getImportStockId());
            }
        }
        _repo.saveAll(data);
        return true;
    }
    public boolean Delete(int id){
        ImportStockDetails prD = _repo.findById(id)
                .orElseThrow(() -> new AppExceptions(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));
        _repo.deleteById(id);
        return true;
    }
}
