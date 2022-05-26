package com.example.infrastock.materialCategory;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;


public class MaterialCategoryDTO {

    private Long id;

    @NotEmpty(message = "Enter category name!")
    @Size(min = 3, message = "Category should have at least 3 characters")
    private String categoryName;

    public MaterialCategoryDTO() {
    }

    public MaterialCategoryDTO(String categoryName) {
        this.categoryName = categoryName;
    }
    public MaterialCategoryDTO(Long id, String categoryName) {
        this.categoryName = categoryName;
        this.id=id;
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
