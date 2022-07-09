package com.example.infrastock.material;

import com.example.infrastock.notification.NotificationService;
import com.example.infrastock.user.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class MaterialController {

    private final MaterialService materialService;


    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }


    @GetMapping("/materials")
    public List<Material> getMaterialList() {
        return materialService.getMaterialList();
    }

    @GetMapping("/getMaterial")
    public Material getMaterialByID(@RequestParam Long id) {

        return materialService.getMaterialByID(id);
    }


    @PostMapping(value = "/addMaterial")
    public String createMaterial(@RequestBody @Valid MaterialDTO materialDTO) {


        if (materialService.checkIfMaterialExist(materialDTO.getMaterialName())) {
            return "The material you have entered is already in DataBase";
        } else {
            materialService.createMaterial(materialDTO);
            return "Congratulations, you've added a new material";
        }
    }

    @PutMapping("/updateMaterial")
    public String updateMaterial(@RequestBody @Valid MaterialDTO materialDTO) {
        System.out.println(materialDTO.getPrice());
        materialService.updateMaterial(materialDTO);
        return "Successfully updated: " + materialDTO.getMaterialName();
    }

    @DeleteMapping("/deleteMaterial")
    public String deleteMaterial(@RequestParam Long id) {
        String categoryName = materialService.getCategoryName(id);
        materialService.deleteMaterial(id);
        return "Successfully deleted: " + categoryName;

    }


    @GetMapping("/sortedMaterials")
    public List<Material> getSortedMaterialsByCategoryName(@RequestParam String categoryName) {


        return materialService.getSortedMaterials(categoryName);
    }

    @GetMapping("/shoppingList")
    public List<Material> getShoppingList() {
        return materialService.getShoppingList();
    }

}
