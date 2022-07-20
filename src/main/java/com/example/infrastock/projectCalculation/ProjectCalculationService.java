package com.example.infrastock.projectCalculation;

import com.example.infrastock.simpleMaterial.SimpleMaterial;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "calculations")
public class ProjectCalculationService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String projectName;
    private String createdOn;
    private float value;
    private double cncTime;
    private String status;
    @OneToMany
    @JoinColumn(name = "material_ID")
    private List<SimpleMaterial> materialList;

}
