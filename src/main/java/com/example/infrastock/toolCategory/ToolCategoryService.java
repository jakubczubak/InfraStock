package com.example.infrastock.toolCategory;

import com.example.infrastock.notification.NotificationService;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ToolCategoryService {

    private final ToolCategoryRepo toolCategoryRepo;
    private final NotificationService notificationService;


    public ToolCategoryService(ToolCategoryRepo toolCategoryRepo, NotificationService notificationService) {
        this.toolCategoryRepo = toolCategoryRepo;
        this.notificationService = notificationService;
    }

    public void createToolCategory(ToolCategoryDTO toolCategoryDTO) {

        ToolCategory newToolCategory = new ToolCategory(toolCategoryDTO.getCategoryName());
        notificationService.sendNotificationToUsers("added new tool category: " + toolCategoryDTO.getCategoryName());
        toolCategoryRepo.save(newToolCategory);
    }


    public boolean checkIfCategoryExist(String categoryName) {

        return toolCategoryRepo.findByToolCategoryName(categoryName) != null;

    }

    public List<ToolCategory> getToolCategories() {
        return toolCategoryRepo.findAll();
    }

    public ToolCategory findByCategoryName(String categoryName) {

        return toolCategoryRepo.findByToolCategoryName(categoryName);
    }

    public String deleteToolCategoryByID(Long id){
        String categoryName = getToolCategoryByID(id).getCategoryName();
        notificationService.sendNotificationToUsers("deleted tool category: " + categoryName);
        toolCategoryRepo.deleteById(id);
        return categoryName;
    }



    public ToolCategory getToolCategoryByID(Long id){
        return toolCategoryRepo.getById(id);
    }

    public void updateToolCategory(ToolCategoryDTO toolCategoryDTO, Long id) {
        ToolCategory toolCategoryToUpdate = toolCategoryRepo.getById(id);
        toolCategoryToUpdate.setCategoryName(toolCategoryDTO.getCategoryName());
        notificationService.sendNotificationToUsers("updated material category: " + toolCategoryDTO.getCategoryName());
        toolCategoryRepo.save(toolCategoryToUpdate);
    }


}


