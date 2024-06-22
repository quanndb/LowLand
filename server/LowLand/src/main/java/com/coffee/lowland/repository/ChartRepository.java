package com.coffee.lowland.repository;

import com.coffee.lowland.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

import java.util.List;
import java.util.Optional;

public interface ChartRepository extends JpaRepository<Material, Integer> {
    @Procedure
    List<Object[]> spGetToltalMoneyDayinMonth(int monthInput, int yearInput);
    @Procedure
    List<Object[]> spGetTopProduct(int topProduct, int typeOrder);
    // typeOrder = 0 San pham ban it nhat
    // typeOrder = 1 San pham ban nhieu nhat
    // topProduct số sản phẩm lấy ra Ví dụ Top5-10-15 sản phẩm nhieefu/ít nhất
}
