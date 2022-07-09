package com.example.infrastock.tool;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ToolRepo extends JpaRepository<Tool, Long> {
    Tool findByToolName(String materialName);

    List<Tool> findAllByToolCategoryNameToolCategoryName(String categoryName);
}
