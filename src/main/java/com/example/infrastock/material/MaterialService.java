package com.example.infrastock.material;

import com.example.infrastock.materialCategory.MaterialCategory;
import com.example.infrastock.materialCategory.MaterialCategoryRepo;
import com.example.infrastock.notification.NotificationService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MaterialService {

    private final MaterialRepo materialRepo;
    private final MaterialCategoryRepo materialCategoryRepo;
    private final NotificationService notificationService;

    public MaterialService(MaterialRepo materialItemRepo, MaterialCategoryRepo materialCategoryRepo, NotificationService notificationService) {
        this.materialRepo = materialItemRepo;
        this.materialCategoryRepo = materialCategoryRepo;
        this.notificationService = notificationService;
    }


    public boolean checkIfMaterialExist(String materialName) {
        return materialRepo.findByMaterialName(materialName) != null;
    }

    public List<Material> getMaterialList() {
        return materialRepo.findAll();
    }


    public Material getMaterialByID(Long id) {
        return materialRepo.findById(id).get();

        //obsluzyc optionala w przyszlosci
    }

    public void createMaterial(MaterialDTO materialDTO) {
        String categoryName = materialDTO.getCategory();

        notificationService.sendNotificationToUsers("added new material: " + materialDTO.getMaterialName());
        MaterialCategory materialCategory = materialCategoryRepo.findByCategoryName(categoryName);
        Material newMaterial = new Material(materialDTO.getMaterialName(), materialDTO.getQuantity(), materialDTO.getMinQuantity(), materialCategory, materialDTO.getX_dimension(), materialDTO.getY_dimension(), materialDTO.getZ_dimension(), materialDTO.getD_outer_dimension(), materialDTO.getD_inner_dimension(), materialDTO.getLength_dimension(), materialDTO.getDensity(), materialDTO.getPrice(), materialDTO.getD_dimension(), materialDTO.getLength_rod_dimension());
        materialRepo.save(newMaterial);

    }

    public void updateMaterial(MaterialDTO materialDTO) {
        Material materialToUpdate = materialRepo.getById(materialDTO.getId());
        materialToUpdate.setMaterialName(materialDTO.getMaterialName());
        materialToUpdate.setQuantity(materialDTO.getQuantity());
        materialToUpdate.setMinQuantity(materialDTO.getMinQuantity());
        materialToUpdate.setCategory(materialCategoryRepo.findByCategoryName(materialDTO.getCategory()));
        materialToUpdate.setX_dimension(materialDTO.getX_dimension());
        materialToUpdate.setY_dimension(materialDTO.getY_dimension());
        materialToUpdate.setZ_dimension(materialDTO.getZ_dimension());
        materialToUpdate.setD_outer_dimension(materialDTO.getD_outer_dimension());
        materialToUpdate.setD_inner_dimension(materialDTO.getD_inner_dimension());
        materialToUpdate.setLength_dimension(materialDTO.getLength_dimension());
        materialToUpdate.setDensity(materialDTO.getDensity());
        materialToUpdate.setPrice(materialDTO.getPrice());
        materialToUpdate.setD_dimension(materialDTO.getD_dimension());
        materialToUpdate.setLength_rod_dimension(materialDTO.getLength_rod_dimension());
        notificationService.sendNotificationToUsers("updated material: " + materialDTO.getMaterialName());
        materialRepo.save(materialToUpdate);
    }

    public void deleteMaterial(Long id) {

        notificationService.sendNotificationToUsers("deleted material: " + materialRepo.getById(id).getMaterialName());
        materialRepo.delete(materialRepo.getById(id));
    }

    public List<Material> getSortedMaterials(String categoryName) {
        return materialRepo.findAllByCategoryCategoryName(categoryName);
    }

    public String getCategoryName(Long id) {
        return materialRepo.getById(id).getCategory().getCategoryName();
    }


    public List<Material> getShoppingList() {

        List<Material> shoppingList = new ArrayList<>();

        materialRepo.findAll().forEach(material -> {
            if (material.getMinQuantity() > material.getQuantity()) {
                shoppingList.add(material);
            }
        });

        return shoppingList;
    }

    public double getNetWorthOfMaterials(){

        double netWorth = 0;
        for(int i = 0; i<materialRepo.findAll().size();i++){

            Material material = materialRepo.findAll().get(i);

            double singleMassForPlate = (material.getDensity() * material.getX_dimension() * material.getY_dimension() *material.getZ_dimension() / 1000000);
            double singleMassForRod = (material.getDensity() * Math.PI * Math.pow((material.getD_dimension() / 2), 2) * material.getLength_rod_dimension() / 1000000);
            double singleMassForTube = (material.getDensity() * Math.PI * (Math.pow((material.getD_outer_dimension() / 2), 2) - Math.pow((material.getD_inner_dimension() / 2), 2)) * material.getLength_dimension() / 1000000);

            double singleMass = 0;

            if(singleMassForPlate > 0){
                singleMass = singleMassForPlate;
            }else if( singleMassForRod > 0) {
                singleMass = singleMassForRod;
            }else {
                singleMass = singleMassForTube;
            }

            netWorth += singleMass * material.getQuantity() * material.getPrice();
        }
        return Math.floor(netWorth*100.0)/100.0;
    }
}
