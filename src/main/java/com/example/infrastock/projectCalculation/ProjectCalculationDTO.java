package com.example.infrastock.projectCalculation;

import com.example.infrastock.simpleMaterial.SimpleMaterial;

import javax.validation.constraints.*;
import java.util.List;

public class ProjectCalculationDTO {

    @NotEmpty(message = "Enter project's name!")
    @Size(min = 3, message = "Project's name should have at least 3 characters")
    private String projectName;

    private float materialValue;
    @NotNull(message = "Enter the machine time")
    @Min(value = 0, message = "Minimum quantity could be 0")
    @Max(value = 99, message = "Maximum quantity could be 1000")
    private int cncTime;
    private String status;

    private List<SimpleMaterial> materialList;

    public ProjectCalculationDTO() {
    }

    public ProjectCalculationDTO(String projectName, float materialValue, int cncTime, String status, List<SimpleMaterial> materialList) {
        this.projectName = projectName;
        this.materialValue = materialValue;
        this.cncTime = cncTime;
        this.status = status;
        this.materialList = materialList;
    }


    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }


    public float getMaterialValue() {
        return materialValue;
    }

    public void setMaterialValue(float materialValue) {
        this.materialValue = materialValue;
    }

    public int getCncTime() {
        return cncTime;
    }

    public void setCncTime(int cncTime) {
        this.cncTime = cncTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<SimpleMaterial> getMaterialList() {
        return materialList;
    }

    public void setMaterialList(List<SimpleMaterial> materialList) {
        this.materialList = materialList;
    }
}
