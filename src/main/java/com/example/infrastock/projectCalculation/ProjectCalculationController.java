package com.example.infrastock.projectCalculation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class ProjectCalculationController {

    private final ProjectCalculationService projectCalculationService;

    public ProjectCalculationController(ProjectCalculationService projectCalculationService){
        this.projectCalculationService = projectCalculationService;
    }

    @PostMapping("/create-calculation")
    public String createCalculation(@RequestBody @Valid ProjectCalculationDTO projectCalculationDTO){
        System.out.println(projectCalculationDTO.getProjectName());
        projectCalculationService.createCalculation(projectCalculationDTO);
        return "Created new calculation: " + projectCalculationDTO.getProjectName();
    }
}
