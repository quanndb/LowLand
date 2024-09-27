package com.coffee.lowland.service.Product;

import com.coffee.lowland.DTO.response.material.MaterialDTO;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.MaterialMapper;
import com.coffee.lowland.model.Material;
import com.coffee.lowland.JPA.repository.MaterialRepository;
import com.coffee.lowland.model.Unit;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Slf4j
public class MaterialService {
    MaterialRepository _repo;
    UnitService unitService;
    MaterialMapper materialMapper;

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public Material updateMaterial(String id, MaterialDTO request){
        Material foundMaterial = getMaterialById(id);
        if(!foundMaterial.getMaterialName().equalsIgnoreCase(request.getMaterialName()))
            checkMaterialName(request.getMaterialName());
        materialMapper.update(foundMaterial,request);
        return _repo.save(foundMaterial);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public List<Material> getAllByQuery(String query, Integer size){
        if(size == null)
        return _repo.findAllByMaterialNameContainsIgnoreCase(query);
        else return _repo
                .findAllByMaterialNameContainsIgnoreCase(query, Pageable.ofSize(size))
                .getContent();
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public boolean deleteMaterial(String id){
        Material foundMaterial = getMaterialById(id);
        foundMaterial.setIsActive(false);
        _repo.save(foundMaterial);
        return true;
    }

    public Material getMaterialById(String id){
        return _repo.findById(id)
                .orElseThrow(() -> new AppExceptions(ErrorCode.PRODUCT_MATERIAL_NOT_FOUND));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public Material getMaterialByName(String materialName){
        return _repo.findByMaterialNameIgnoreCase(materialName)
                .orElseThrow(()->new AppExceptions(ErrorCode.PRODUCT_MATERIAL_NOT_FOUND));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public Material getOrCreateMaterialByName(String materialName,String unitName, Double quantity, String description){
        Material found =  _repo.findByMaterialNameIgnoreCase(materialName)
                .orElseGet(()->{
                    Unit unit = unitService.getOrCreateUnit(unitName);
                    return _repo.save(Material.builder()
                            .materialName(materialName)
                            .unitName(unit.getUnitName())
                            .description(description)
                            .quantity(0D)
                            .minQuantity(1000D)
                            .isActive(true)
                            .build());
                });
        found.setQuantity(found.getQuantity()+quantity);
        return _repo.save(found);
    }

    public void updateQuantityMaterialAfterApproveOrder(String orderId){
        List<Object[]> res = _repo.spGetMaterialInProductFromOrder(orderId);
        for(Object[] item : res){
            getOrCreateMaterialByName((String)item[0], null, -((Double) item[1]),"");
        }
    }

    public void checkMaterialName(String materialName){
        if(_repo.existsByMaterialNameIgnoreCase(materialName))
        {
            throw new AppExceptions(ErrorCode.PRODUCT_MATERIAL_EXISTED);
        }
    }
}
