package com.example.infrastock.toolCategory;



import com.example.infrastock.materialCategory.MaterialCategoryDTO;
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

        System.out.println(categoryDTO.getCategoryName());
        if (toolCategoryService.checkIfCategoryExist(categoryDTO.getCategoryName())) {
            return "The tool category you have entered is already in DataBase";
        } else {
            toolCategoryService.createToolCategory(categoryDTO);
            return "Congratulations, you've added a new tool category";
        }
    }

    @DeleteMapping("/deleteToolCategory")
    public String deleteMaterialCategory(@RequestParam Long id) {


        return "Successfully deleted category: " + toolCategoryService.deleteToolCategoryByID(id);

    }

    @PostMapping("/updateTool")
    public String updateToolCategory(@RequestBody @Valid ToolCategoryDTO toolCategoryDTO, @RequestParam Long id) {
        toolCategoryService.updateToolCategory(toolCategoryDTO, id);
        return "Successfully tool category updated: " + toolCategoryDTO.getCategoryName();
    }
}
