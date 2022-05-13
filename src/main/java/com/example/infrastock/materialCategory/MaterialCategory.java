package com.example.infrastock.materialCategory;

import javax.persistence.*;

@Entity
@Table(name = "categories")
public class MaterialCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String categoryName;

    public MaterialCategory() {
    }

    public MaterialCategory(String categoryName) {
        this.categoryName = categoryName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
