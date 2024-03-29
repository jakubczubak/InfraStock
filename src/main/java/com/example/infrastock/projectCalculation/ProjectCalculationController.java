package com.example.infrastock.projectCalculation;

import com.example.infrastock.simpleMaterial.SimpleMaterial;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class ProjectCalculationController {

    private final ProjectCalculationService projectCalculationService;

    public ProjectCalculationController(ProjectCalculationService projectCalculationService){
        this.projectCalculationService = projectCalculationService;
    }

    @PostMapping("/create-calculation")
    public String createCalculation(@RequestBody @Valid ProjectCalculationDTO projectCalculationDTO){
        projectCalculationService.createCalculation(projectCalculationDTO);
        return "Created new calculation: " + projectCalculationDTO.getProjectName();
    }

    @GetMapping("/get-calculation-list")
    public List<ProjectCalculation> getCalculationList(){
        return projectCalculationService.getCalculationList();
    }

    @DeleteMapping("/delete-calculation")
    public String deleteCalculation(@RequestParam Long id){
        String projectName = projectCalculationService.getProjectCalculationByID(id).getProjectName();
        projectCalculationService.deleteCalculation(id);
        return "Deleted calculation for: " + projectName;
    }

    @GetMapping("/get-calculation")
    public ProjectCalculation getProjectCalculationByID(@RequestParam Long id){
        return projectCalculationService.getProjectCalculationByID(id);
    }

//    @PostMapping("/update")
//    public void addMaterialToCalculation(@RequestBody SimpleMaterial simpleMaterial,@RequestParam Long id ){
//        projectCalculationService.addMaterialToExistCalculation(id,simpleMaterial);
//    }
}
