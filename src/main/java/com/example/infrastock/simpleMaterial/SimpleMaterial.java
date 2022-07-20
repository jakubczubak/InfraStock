package com.example.infrastock.simpleMaterial;

import javax.persistence.*;

@Entity
@Table(name="simple_materials")
public class SimpleMaterial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private String category;
    private int quantity;
    private float value;

    public SimpleMaterial() {
    }

    public SimpleMaterial(Long id, String description, String category, int quantity, float value) {
        this.id = id;
        this.description = description;
        this.category = category;
        this.quantity = quantity;
        this.value = value;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public float getValue() {
        return value;
    }

    public void setValue(float value) {
        this.value = value;
    }
}
