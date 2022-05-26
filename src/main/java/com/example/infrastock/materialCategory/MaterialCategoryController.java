package com.example.infrastock.materialCategory;

import com.example.infrastock.material.MaterialDTO;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/materials")
public class MaterialCategoryController {


    private final MaterialCategoryService materialCategoryService;

    public MaterialCategoryController(MaterialCategoryService materialCategoryService) {
        this.materialCategoryService = materialCategoryService;
    }

    @GetMapping("/categories")
    public List<MaterialCategory> getCategoriesList() {
        return materialCategoryService.getMaterialCategories();
    }


    @PostMapping(value = "/addCategory")
    public String createMaterialCategory(@RequestBody @Valid MaterialCategoryDTO categoryDTO) {


        if (materialCategoryService.checkIfCategoryExist(categoryDTO.getCategoryName())) {
            return "The category you have entered is already in DataBase";
        } else {
            materialCategoryService.createMaterialCategory(categoryDTO);
            return "Congratulations, you've added a new category";
        }
    }

    @DeleteMapping("/deleteMaterialCategory")
    public String deleteMaterialCategory(@RequestParam Long id) {


        return "Successfully deleted category: " + materialCategoryService.deleteMaterialCategoryByID(id);

    }

    @PostMapping("/updateMaterial")
    public String updateMaterialCategory(@RequestBody @Valid MaterialCategoryDTO materialCategoryDTO, @RequestParam Long id) {
        materialCategoryService.updateMaterialCategory(materialCategoryDTO, id);
        return "Successfully material category updated: " + materialCategoryDTO.getCategoryName();
    }


}
