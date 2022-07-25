package com.example.infrastock.projectCalculation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectCalculationRepo extends JpaRepository<ProjectCalculation,Long> {
}
