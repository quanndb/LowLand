package com.coffee.lowland.service;

import com.coffee.lowland.DTO.chart.chartTopBestSale;
import com.coffee.lowland.DTO.chart.chartTotalMoney;
import com.coffee.lowland.DTO.response.product.ProductRespone;
import com.coffee.lowland.repository.ChartRepository;
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

    @Transactional
    public List<chartTotalMoney> GetToltalMoneyDayinMonth(int monthInput, int yearInput){
        List<chartTotalMoney> result = new ArrayList<>();
        List<Object[]> orders = _repo.spGetToltalMoneyDayinMonth(monthInput, yearInput);
        for(Object[] item : orders){
            result.add(
                    chartTotalMoney.builder()
                            .dayInMonth((Integer) item[0])
                            .totalMoney(((BigDecimal) item[1]).intValue())
                            .build()
            );
        }
        return result;
    }

    @Transactional
    public List<chartTopBestSale> GetTopProduct(int topProduct, int typeOrder){
        List<chartTopBestSale> result = new ArrayList<>();
        List<Object[]> orders = _repo.spGetTopProduct(topProduct, typeOrder);
        for(Object[] item : orders){
            result.add(
                    chartTopBestSale.builder()
                            .productName((String) item[0])
                            .quantity((Integer) item[1])
                            .build()
            );
        }
        return result;
    }
}
