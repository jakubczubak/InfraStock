package com.example.infrastock.projectCalculation;

import com.example.infrastock.material.Material;
import com.example.infrastock.material.MaterialDTO;
import com.example.infrastock.materialCategory.MaterialCategory;
import com.example.infrastock.simpleMaterial.SimpleMaterial;
import org.springframework.stereotype.Service;

import javax.persistence.*;
import java.text.DecimalFormat;
import java.util.List;

@Service
public class ProjectCalculationService {

    private final ProjectCalculationRepo projectCalculationRepo;

    public ProjectCalculationService(ProjectCalculationRepo projectCalculationRepo){
        this.projectCalculationRepo=projectCalculationRepo;
    }

    public void createCalculation(ProjectCalculationDTO projectCalculationDTO) {

        ProjectCalculation projectCalculation = new ProjectCalculation(projectCalculationDTO.getProjectName(),Math.round(projectCalculationDTO.getMaterialValue()),projectCalculationDTO.getCncTime(), projectCalculationDTO.getStatus(),projectCalculationDTO.getMaterialList());
        projectCalculationRepo.save(projectCalculation);
    }

    public List<ProjectCalculation> getCalculationList(){
        return projectCalculationRepo.findAll();
    }

    public void deleteCalculation(Long id){
        projectCalculationRepo.deleteById(id);
    }

    public ProjectCalculation getProjectCalculationByID(Long id){
        return projectCalculationRepo.findById(id).get();
    }
}
