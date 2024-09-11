package com.coffee.lowland.service.Utilities;

import com.coffee.lowland.DTO.chart.ChartTopBestSale;
import com.coffee.lowland.DTO.chart.ChartTotalMoney;
import com.coffee.lowland.DTO.response.utilities.PageServiceResponse;
import com.coffee.lowland.DTO.response.utilities.StoreStuff;
import com.coffee.lowland.JPA.repository.ChartRepository;
import com.coffee.lowland.model.Material;
import jakarta.persistence.StoredProcedureQuery;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChartService {
    ChartRepository _repo;
    PageService<Material> pageService;

    @Transactional
    public List<ChartTotalMoney> getTotalMoneyInMonth(int monthInput, int yearInput){
        List<ChartTotalMoney> result = new ArrayList<>();
        List<Object[]> orders = _repo.spGetTotalMoneyInMonth(monthInput, yearInput);
        for(Object[] item : orders){
            result.add(
                    ChartTotalMoney.builder()
                            .dayInMonth((Integer) item[0])
                            .totalMoney((BigDecimal) item[1])
                            .totalOrders((Long) item[2])
                            .build()
            );
        }
        return result;
    }

    @Transactional
    public StoreStuff getStuff(){
        Object[] res = _repo.spGetTotalStuff().get(0);
        return StoreStuff.builder()
                .customer((Long) res[0])
                .orderInMonth((Long) res[1])
                .product((Long) res[2])
                .productType((Long) res[3])
                .material((Long) res[4])
                .build();
    }

    @Transactional
    public List<ChartTopBestSale> GetTopProduct(int topProduct){
        List<ChartTopBestSale> result = new ArrayList<>();
        List<Object[]> orders = _repo.spGetTopProduct(topProduct);
        for(Object[] item : orders){
            result.add(
                    ChartTopBestSale.builder()
                            .productName((String) item[0])
                            .quantity((BigDecimal) item[1])
                            .build()
            );
        }
        return result;
    }

    @Transactional
    public PageServiceResponse<Material> getMaterialChart(int page, int size, String query, String sortedBy, String sortDirection) {
        StoredProcedureQuery store = pageService.prepareStatement("spGetMaterialChart", Material.class, page,size,query,sortedBy,sortDirection);
        return pageService.pageResponse(store);
    }
}
