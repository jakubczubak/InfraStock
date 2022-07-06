package com.example.infrastock.toolCategory;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;


public class ToolCategoryDTO {

    private Long id;

    @NotEmpty(message = "Enter tool category name!")
    @Size(min = 3, message = "Tool category should have at least 3 characters")
    private String categoryName;

    public ToolCategoryDTO() {
    }

    public ToolCategoryDTO(String categoryName) {
        this.categoryName = categoryName;
    }
    public ToolCategoryDTO(Long id, String categoryName) {
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

    public void setCategoryName(String toolCategoryName) {
        this.categoryName = toolCategoryName;
    }
}
