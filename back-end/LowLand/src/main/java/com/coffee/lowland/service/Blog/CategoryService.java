package com.coffee.lowland.service.Blog;

import com.coffee.lowland.Mongo.repository.CategoryRepository;
import com.coffee.lowland.model.Category;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryService {
    CategoryRepository categoryRepository;

    @PreAuthorize("hasAnyAuthority('ADMIN', 'EMPLOYEE')")
    public Category getOrCreate(String name){
        return categoryRepository.findByNameIgnoreCase(name)
                .orElseGet(()-> categoryRepository.save(Category.builder()
                        .name(name)
                        .build()));
    }

    public List<Category> getCategories(String query, Integer size){
        if(size != null){
            Pageable pageable = Pageable.ofSize(size);
            return categoryRepository.findByNameContainsIgnoreCase(query,pageable).getContent();
        }
        else return categoryRepository.findByNameContainsIgnoreCase(query);
    }
}
