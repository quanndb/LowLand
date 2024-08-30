package com.coffee.lowland.service.Product;

import com.coffee.lowland.JPA.repository.UnitRepository;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.Unit;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class UnitService {
    UnitRepository _repo;

    public Unit createUnit(Unit req){
        checkUnitName(req.getUnitName());
        return _repo.save(req);
    }

    public boolean deleteUnit(String unitId){
        Unit found = _repo.findById(unitId)
                .orElseThrow(()->new AppExceptions(ErrorCode.UNIT_NOT_FOUND));
        found.setIsActive(false);
        _repo.save(found);
        return true;
    }

    public List<Unit> getUnits(String query){
        return _repo.findAllByUnitNameContainsIgnoreCase(query);
    }

    public Unit getOrCreateUnit(String unitName){
        return _repo.findByUnitNameIgnoreCase(unitName)
                .orElseGet(()-> _repo.save(Unit.builder()
                                .unitName(unitName)
                        .build()));
    }

    public void checkUnitName(String unitName){
        if(_repo.existsByUnitNameIgnoreCase(unitName))
        {
            throw new AppExceptions(ErrorCode.UNIT_EXISTED);
        }
    }
}
