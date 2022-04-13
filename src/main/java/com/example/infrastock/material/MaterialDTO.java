package com.example.infrastock.material;

import com.example.infrastock.materialCategory.MaterialCategory;

import javax.validation.constraints.*;

public class MaterialDTO {

    private Long id;
    @NotEmpty(message = "Enter material description!")
    @Size(min = 3, message = "Material description should have at least 3 characters")
    private String materialName;

    @NotNull(message = "Enter the quantity")
    @Min(value = 0, message ="Chose the category of material!" )
    @Max(value = 99, message = "Maximum quantity could be 99")
    private Integer quantity;


    @NotNull(message = "Enter the minimum quantity")
    @Min(value = 0, message = "Minimum quantity could be 0")
    @Max(value = 99, message = "Maximum quantity could be 99")
    private Integer minQuantity;


    @NotEmpty(message = "Chose the category of material!")
    private String category;


    public MaterialDTO() {
    }

    public MaterialDTO(String materialName, Integer quantity, Integer minQuantity, String category){
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

    public void setMinQuantity(int minQuantity) {
        this.minQuantity = minQuantity;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
