package com.coffee.lowland.repository;

import com.coffee.lowland.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, String> {
    List<Blog> findBlogById(String id);

}
