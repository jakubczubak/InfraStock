package com.example.infrastock.toolCategory;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/tools")
public class ToolCategoryController {


    private final ToolCategoryService toolCategoryService;

    public ToolCategoryController(ToolCategoryService toolCategoryService) {
        this.toolCategoryService = toolCategoryService;
    }

    @GetMapping("/categories")
    public List<ToolCategory> getCategoriesList() {
        return toolCategoryService.getToolCategories();
    }


    @PostMapping(value = "/addCategory")
    public String createMaterialCategory(@RequestBody @Valid ToolCategoryDTO categoryDTO) {

        if (toolCategoryService.checkIfCategoryExist(categoryDTO.getCategoryName())) {
            return categoryDTO.getCategoryName() + " already exist!";
        } else {
            toolCategoryService.createToolCategory(categoryDTO);
            return "Successfully added tool category";
        }
    }

    @DeleteMapping("/deleteToolCategory")
    public String deleteMaterialCategory(@RequestParam Long id) {


        return "Successfully deleted category: " + toolCategoryService.deleteToolCategoryByID(id);

    }

    @PostMapping("/updateTool")
    public String updateToolCategory(@RequestBody @Valid ToolCategoryDTO toolCategoryDTO, @RequestParam Long id) {
        toolCategoryService.updateToolCategory(toolCategoryDTO, id);
        return "Successfully updated: " + toolCategoryDTO.getCategoryName();
    }
}
