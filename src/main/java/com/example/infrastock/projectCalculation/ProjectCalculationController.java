package com.example.infrastock.projectCalculation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
}
