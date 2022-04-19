package com.example.infrastock.material;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterialRepo extends JpaRepository<Material, Long> {
    Material findByMaterialName(String materialName);
    List<Material> findAllByCategoryCategoryName(String categoryName);
}
