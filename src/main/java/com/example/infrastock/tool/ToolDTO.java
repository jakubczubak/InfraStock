package com.example.infrastock.tool;

import javax.validation.constraints.*;

public class ToolDTO {

    private Long id;
    @NotEmpty(message = "Enter tool description!")
    @Size(min = 3, message = "Tool description should have at least 3 characters")
    private String toolName;

    @NotNull(message = "Enter the quantity")
    @Min(value = 0, message = "Chose the category of tool!")
    @Max(value = 99, message = "Maximum quantity could be 99")
    private Integer quantity;


    @NotNull(message = "Enter the minimum quantity")
    @Min(value = 0, message = "Minimum quantity could be 0")
    @Max(value = 99, message = "Maximum quantity could be 99")
    private Integer minQuantity;


    @NotEmpty(message = "Chose the category of tool!")
    private String category;

    @Min(value = 0, message = "Minimum price could be 0")
    private float price;


    public ToolDTO() {
    }

    public ToolDTO(String toolName, Integer quantity, Integer minQuantity, String category) {
        this.toolName = toolName;
        this.quantity = quantity;
        this.minQuantity = minQuantity;
        this.category = category;
    }

    public ToolDTO(String toolName, Integer quantity, Integer minQuantity, String category, float price) {
        this.toolName = toolName;
        this.quantity = quantity;
        this.minQuantity = minQuantity;
        this.category = category;
        this.price = price;
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

    public void setMinQuantity(int minQuantity) {
        this.minQuantity = minQuantity;
    }

    public void setMinQuantity(Integer minQuantity) {
        this.minQuantity = minQuantity;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }
}
