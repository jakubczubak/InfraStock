package com.example.infrastock.toolCategory;

import javax.persistence.*;

@Entity
@Table(name = "tool_categories")
public class ToolCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String toolCategoryName;

    public ToolCategory() {
    }

    public ToolCategory(String toolCategoryName) {
        this.toolCategoryName = toolCategoryName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoryName() {
        return toolCategoryName;
    }

    public void setCategoryName(String toolCategoryName) {
        this.toolCategoryName = toolCategoryName;
    }
}
