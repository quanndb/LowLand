package com.coffee.lowland.service.Utilities;

import com.coffee.lowland.DTO.chart.ChartTopBestSale;
import com.coffee.lowland.DTO.chart.ChartTotalMoney;
import com.coffee.lowland.DTO.request.auth.DetailsLogin;
import com.coffee.lowland.DTO.response.utilities.ChartAccessResponse;
import com.coffee.lowland.DTO.response.utilities.PageServiceResponse;
import com.coffee.lowland.DTO.response.utilities.StoreStuff;
import com.coffee.lowland.JPA.repository.AccessRepository;
import com.coffee.lowland.JPA.repository.ChartRepository;
import com.coffee.lowland.model.Access;
import com.coffee.lowland.model.Material;
import jakarta.persistence.StoredProcedureQuery;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChartService {
    ChartRepository _repo;
    AccessRepository accessRepository;
    PageService<Material> pageMaterialService;
    PageService<Access> pageAccessService;

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
        StoredProcedureQuery store = pageMaterialService.prepareStatement("spGetMaterialChart", Material.class, page,size,query,sortedBy,sortDirection);
        return pageMaterialService.pageResponse(store);
    }

    @PreAuthorize("@securityService.hasAnyRole('ADMIN', 'EMPLOYEE')")
    @Transactional
    public PageServiceResponse<Access> getTotalAccess(int page, int size, String query,
                                                      String sortedBy, String sortDirection,
                                                      Integer month, Integer year){
        StoredProcedureQuery store = pageAccessService.prepareStatement("spGetAccessInMonth", Access.class,
                page,size,query,sortedBy,sortDirection);
        pageAccessService.addField(store, "monthInput", Integer.class, month);
        pageAccessService.addField(store, "yearInput", Integer.class, year);
        return pageAccessService.pageResponse(store);
    }

    public String postAccess(DetailsLogin detailsLogin){
        accessRepository.save(Access.builder()
                        .date(LocalDateTime.now())
                        .ip(detailsLogin.getIP())
                        .userAgent(detailsLogin.getUserAgent())
                        .user(SecurityContextHolder.getContext().getAuthentication().getName())
                .build());
        return "Welcome to Lowland!";
    }

    @PreAuthorize("@securityService.hasAnyRole('ADMIN', 'EMPLOYEE')")
    @Transactional
    public List<ChartAccessResponse> getTotalAccessInMonthOrYear(Integer month, Integer year) {
        List<Object[]> res = accessRepository.spGetTotalAccessInMonthOrYear(month, year);
        List<ChartAccessResponse> responses = new ArrayList<>();
        for(Object[] item : res){
            responses.add(ChartAccessResponse.builder()
                            .date(String.valueOf(item[0]))
                            .total((Long) item[1])
                    .build());
        }
        return responses;
    }
}
