package com.example.infrastock.tool;

import com.example.infrastock.materialCategory.MaterialCategory;
import com.example.infrastock.toolCategory.ToolCategory;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "tools")
public class Tool {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String toolName;
    private Integer quantity;
    private Integer minQuantity;
    @OneToOne
    private ToolCategory toolCategoryName;
    @Column(name = "updated_on")
    private String updatedOn;
    private float price;

    public Tool() {
    }

    public Tool(String toolName, Integer quantity, Integer minQuantity, ToolCategory toolCategoryName) {
        this.toolName = toolName;
        this.quantity = quantity;
        this.minQuantity = minQuantity;
        this.toolCategoryName = toolCategoryName;

    }

    public Tool(String toolName, Integer quantity, Integer minQuantity, ToolCategory toolCategoryName, float price) {
        this.toolName = toolName;
        this.quantity = quantity;
        this.minQuantity = minQuantity;
        this.toolCategoryName = toolCategoryName;
        this.price = price;
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

    public void setUpdatedOn(String updatedOn) {
        this.updatedOn = updatedOn;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToolName() {
        return toolName;
    }

    public void setToolName(String toolName) {
        this.toolName = toolName;
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

    public ToolCategory getToolCategoryName() {
        return toolCategoryName;
    }

    public void setToolCategoryName(ToolCategory toolCategoryName) {
        this.toolCategoryName = toolCategoryName;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }
}
