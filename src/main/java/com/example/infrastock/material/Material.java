package com.example.infrastock.material;

import com.example.infrastock.materialCategory.MaterialCategory;

import javax.persistence.*;

@Entity
@Table(name = "materials")
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String materialName;
    private int quntity;
    private int minQuantity;
    @OneToOne
    private MaterialCategory category;


    public Material() {
    }

    public Material(String materialName, int quantity, int minQuantity, MaterialCategory category){
        this.materialName = materialName;
        this.quntity=quantity;
        this.minQuantity=minQuantity;
        this.category=category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaterialName() {
        return materialName;
    }

    public void setMaterialName(String materialName) {
        this.materialName = materialName;
    }

    public int getQuntity() {
        return quntity;
    }

    public void setQuntity(int quntity) {
        this.quntity = quntity;
    }

    public int getMinQuantity() {
        return minQuantity;
    }

    public void setMinQuantity(int minQuantity) {
        this.minQuantity = minQuantity;
    }

    public MaterialCategory getCategory() {
        return category;
    }

    public void setCategory(MaterialCategory category) {
        this.category = category;
    }
}
