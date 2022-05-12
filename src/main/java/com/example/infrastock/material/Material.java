package com.example.infrastock.material;

import com.example.infrastock.materialCategory.MaterialCategory;
import com.example.infrastock.materialCategory.MaterialCategoryDTO;

import javax.persistence.*;
import javax.validation.constraints.Min;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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
    @Column(name = "updated_on")
    private String updatedOn;

    private float x_dimension;
    private float y_dimension;
    private float z_dimension;
    private float d_outer_dimension;
    private float d_inner_dimension;
    private float length_dimension;
    private float density;
    private float price;

    public Material() {
    }

    public Material(String materialName, Integer quantity, Integer minQuantity, MaterialCategory category){
        this.materialName = materialName;
        this.quantity=quantity;
        this.minQuantity=minQuantity;
        this.category=category;

    }
    public Material(String materialName, Integer quantity, Integer minQuantity, MaterialCategory category, float x_dimension, float y_dimension, float z_dimension, float d_outer_dimension, float d_inner_dimension, float length_dimension, float density, float price){
        this.materialName = materialName;
        this.quantity=quantity;
        this.minQuantity=minQuantity;
        this.category=category;
        this.x_dimension=x_dimension;
        this.y_dimension=y_dimension;
        this.z_dimension=z_dimension;
        this.d_outer_dimension=d_outer_dimension;
        this.d_inner_dimension=d_inner_dimension;
        this.length_dimension=length_dimension;
        this.density=density;
        this.price=price;

    }



    @PreUpdate
    public void preUpdate() {
        LocalDateTime now = LocalDateTime.now();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        updatedOn = now.format(formatter);
    }

    public String getUpdatedOn() {
        return updatedOn;
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

    public void setUpdatedOn(String updatedOn) {
        this.updatedOn = updatedOn;
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
