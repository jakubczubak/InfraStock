package com.example.infrastock.notification;

import com.example.infrastock.material.Material;
import com.example.infrastock.material.MaterialDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepo notificationRepo;

    public NotificationService(NotificationRepo notificationRepo) {
        this.notificationRepo = notificationRepo;
    }

    public void addNotification(MaterialDTO materialDTO) {
        if(materialDTO.getMinQuantity()>materialDTO.getQuantity()){
            Notification newNotification = new Notification("Check the quantity of: " + materialDTO.getMaterialName(),false);
            notificationRepo.save(newNotification);
        }
    }



    public List<Notification> getNotificationList() {
        return notificationRepo.findAll();
    }
}
