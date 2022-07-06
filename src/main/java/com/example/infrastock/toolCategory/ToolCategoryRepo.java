package com.example.infrastock.toolCategory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToolCategoryRepo extends JpaRepository<ToolCategory, Long> {

    ToolCategory findByToolCategoryName(String toolCategoryName);
}
