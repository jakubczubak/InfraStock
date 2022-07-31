package com.example.infrastock.projectCalculation;

import com.example.infrastock.simpleMaterial.SimpleMaterial;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Entity
@Table(name = "calculations")
public class ProjectCalculation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String projectName;

    private String createdOn;
    private float materialValue;
    private int cncTime;
    private String status;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "calculation_ID")
    private List<SimpleMaterial> materialList;

    public ProjectCalculation() {
    }

    public ProjectCalculation(String projectName, float materialValue, int cncTime, String status, List<SimpleMaterial> materialList) {
        this.projectName = projectName;
        this.materialValue = materialValue;
        this.cncTime = cncTime;
        this.status = status;
        this.materialList = materialList;
    }


    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        createdOn = now.format(formatter);
    }

    public String getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(String createdOn) {
        this.createdOn = createdOn;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
