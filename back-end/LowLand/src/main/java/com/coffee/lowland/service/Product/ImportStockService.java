package com.coffee.lowland.service.Product;

import com.coffee.lowland.DTO.ImportStockDTO;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.*;
import com.coffee.lowland.JPA.repository.ImportStockRepository;
import com.coffee.lowland.service.Utilities.RandomCodeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Slf4j
public class ImportStockService {
    RandomCodeService _random;
    ImportStockRepository _repo;
    ImportStockDetailsService _detailsService;


    public List<ImportStock> GetAll(){
        return _repo.findAll();
    }

    public boolean CreateOrUpdateImportStock(ImportStockDTO data) throws IOException {
        ImportStock model = data.getData();
        String ImportStockID = CreateOrUpdate(model);
        _detailsService.Create(data.getListDetails(), ImportStockID);
        return true;
    }


    public String CreateOrUpdate(ImportStock data){
        ImportStock save = new ImportStock();
        Optional<ImportStock> modelCheck = _repo.findById(data.getImportStockId());
        if(modelCheck.isPresent()){
            if(modelCheck.get().getImportStockId() != data.getImportStockId())
                throw new AppExceptions(ErrorCode.PRODUCT_EXISTED);
        }
        save = _repo.save(data);
        return save.getImportStockId();
    }


    public boolean Delete(String id){
        ImportStock res = _repo.findById(id).orElseThrow( () -> new AppExceptions(ErrorCode.PRODUCT_NOT_FOUND));
        _repo.deleteById(id);
        List<ImportStockDetails> lst = _detailsService.GetAll(id);
        for(ImportStockDetails details : lst){
            _detailsService.Delete(details.getDetailsId());
        }
        return true;
    }

    public ImportStock GetById(String id){
        return _repo.findById(id)
                .orElseThrow(() -> new AppExceptions(ErrorCode.PRODUCT_NOT_FOUND));
    }

}
