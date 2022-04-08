package com.example.infrastock.materialCategory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialCategoryRepo extends JpaRepository<MaterialCategory, Long> {

    MaterialCategory findByCategoryName(String categoryName);
}
