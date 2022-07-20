package com.example.infrastock.simpleMaterial;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SimpleMaterialRepo extends JpaRepository<SimpleMaterial, Long> {
}
