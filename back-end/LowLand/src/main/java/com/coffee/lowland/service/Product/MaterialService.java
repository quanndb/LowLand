package com.coffee.lowland.service.Product;

import com.coffee.lowland.DTO.MaterialDTO;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.Material;
import com.coffee.lowland.JPA.repository.MaterialRepository;
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
public class MaterialService {
    MaterialRepository _repo;

    public Material addMaterial(MaterialDTO data){
        Material foundMaterial = _repo
                .findByMaterialNameIgnoreCase(data.getMaterialName())
                .orElse(Material.builder()
                        .materialName(data.getMaterialName())
                        .quantity(data.getQuantity())
                        .minQuantity(data.getMinQuantity())
                        .unitName(data.getUnitName())
                        .build());
        foundMaterial.setQuantity(foundMaterial.getQuantity()+data.getQuantity());
        return _repo.save(foundMaterial);
    }

    public Material updateMaterial(Material request){
        checkMaterialName(request.getMaterialName());
        getMaterialById(request.getMaterialId());
        return _repo.save(request);
    }

    public List<Material> getAllByQuery(String query){
        return _repo.findAllByMaterialNameContainsIgnoreCase(query);
    }

    public boolean deleteMaterial(String id){
        getMaterialById(id);
        _repo.deleteById(id);
        return true;
    }

    public Material getMaterialById(String id){
        return _repo.findById(id)
                .orElseThrow(() -> new AppExceptions(ErrorCode.PRODUCT_MATERIAL_NOT_FOUND));
    }

    public void checkMaterialName(String materialName){
        if(_repo.existsByMaterialNameIgnoreCase(materialName))
        {
            throw new AppExceptions(ErrorCode.PRODUCT_MATERIAL_EXISTED);
        }
    }
}
