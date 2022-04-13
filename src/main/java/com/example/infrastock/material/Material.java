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
    private Integer quantity;
    private Integer minQuantity;
    @OneToOne
    private MaterialCategory category;


    public Material() {
    }

    public Material(String materialName, Integer quantity, Integer minQuantity, MaterialCategory category){
        this.materialName = materialName;
        this.quantity=quantity;
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

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getMinQuantity() {
        return minQuantity;
    }

    public void setMinQuantity(Integer minQuantity) {
        this.minQuantity = minQuantity;
    }

    public MaterialCategory getCategory() {
        return category;
    }

    public void setCategory(MaterialCategory category) {
        this.category = category;
    }
}
