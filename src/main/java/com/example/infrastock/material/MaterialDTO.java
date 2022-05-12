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

    @Min(value = 0, message = "Minimum dimension could be 0")
    private float x_dimension;

    @Min(value = 0, message = "Minimum dimension could be 0")
    private float y_dimension;

    @Min(value = 0, message = "Minimum dimension could be 0")
    private float z_dimension;

    @Min(value = 0, message = "Minimum dimension could be 0")
    private float d_outer_dimension;

    @Min(value = 0, message = "Minimum dimension could be 0")
    private float d_inner_dimension;

    @Min(value = 0, message = "Minimum length could be 0")
    private float length_dimension;

    @Min(value = 0, message = "Minimum density could be 0")
    private float density;

    @Min(value = 0, message = "Minimum price could be 0")
    private float price;


    public MaterialDTO() {
    }

    public MaterialDTO(String materialName, Integer quantity, Integer minQuantity, String category){
        this.materialName = materialName;
        this.quantity=quantity;
        this.minQuantity=minQuantity;
        this.category=category;
    }

    public MaterialDTO(String materialName, Integer quantity, Integer minQuantity, String category, float x_dimension, float y_dimension, float z_dimension, float d_outer_dimension, float d_inner_dimension, float length_dimension, float density, float price) {
        this.materialName = materialName;
        this.quantity = quantity;
        this.minQuantity = minQuantity;
        this.category = category;
        this.x_dimension = x_dimension;
        this.y_dimension = y_dimension;
        this.z_dimension = z_dimension;
        this.d_outer_dimension = d_outer_dimension;
        this.d_inner_dimension = d_inner_dimension;
        this.length_dimension = length_dimension;
        this.density = density;
        this.price = price;
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

    public void setMinQuantity(Integer minQuantity) {
        this.minQuantity = minQuantity;
    }

    public float getX_dimension() {
        return x_dimension;
    }

    public void setX_dimension(float x_dimension) {
        this.x_dimension = x_dimension;
    }

    public float getY_dimension() {
        return y_dimension;
    }

    public void setY_dimension(float y_dimension) {
        this.y_dimension = y_dimension;
    }

    public float getZ_dimension() {
        return z_dimension;
    }

    public void setZ_dimension(float z_dimension) {
        this.z_dimension = z_dimension;
    }

    public float getD_outer_dimension() {
        return d_outer_dimension;
    }

    public void setD_outer_dimension(float d_outer_dimension) {
        this.d_outer_dimension = d_outer_dimension;
    }

    public float getD_inner_dimension() {
        return d_inner_dimension;
    }

    public void setD_inner_dimension(float d_inner_dimension) {
        this.d_inner_dimension = d_inner_dimension;
    }

    public float getLength_dimension() {
        return length_dimension;
    }

    public void setLength_dimension(float length_dimension) {
        this.length_dimension = length_dimension;
    }

    public float getDensity() {
        return density;
    }

    public void setDensity(float density) {
        this.density = density;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }
}
