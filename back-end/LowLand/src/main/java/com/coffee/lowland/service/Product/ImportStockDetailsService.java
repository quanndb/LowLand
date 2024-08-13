package com.coffee.lowland.service.Product;

import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.ImportStockDetails;
import com.coffee.lowland.JPA.repository.ImportStockDetailsRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Slf4j
public class ImportStockDetailsService {
    ImportStockDetailsRepository _repo;

    public List<ImportStockDetails> GetAll(String ImportStockID){
        List<ImportStockDetails> lst = _repo.findAllByImportStockId(ImportStockID);
        return lst;
    }

    public boolean Create(List<ImportStockDetails> data, String ImportStockID){
        List<ImportStockDetails> lst = GetAll(ImportStockID);
        if(!lst.isEmpty()){
            for( int i =0; i < lst.size(); i++){
                Delete(lst.get(i).getDetailsId());
            }
        }
        for(ImportStockDetails details : data){
            details.setImportStockId(ImportStockID);
            // Tăng số lượng material
        }
        _repo.saveAll(data);
        return true;
    }
    public boolean Delete(String id){
        ImportStockDetails prD = _repo.findById(id)
                .orElseThrow(() -> new AppExceptions(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));
        _repo.deleteById(id);
        return true;
    }
}
