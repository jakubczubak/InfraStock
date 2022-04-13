package com.example.infrastock.material;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
public class MaterialController {

    private MaterialService materialService;


    public MaterialController(MaterialService materialService){
        this.materialService=materialService;
    }


    @GetMapping("/materials")
    public List<Material> getMaterialList(){
        return materialService.getMaterialList();
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
}
