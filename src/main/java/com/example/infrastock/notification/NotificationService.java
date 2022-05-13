package com.example.infrastock.notification;

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
        if (materialDTO.getMinQuantity() > materialDTO.getQuantity()) {
            Notification newNotification = new Notification("Small amount of: <strong>" + materialDTO.getMaterialName() + "<strong>", false);
            notificationRepo.save(newNotification);
        }
    }


    public List<Notification> getNotificationList() {
        return notificationRepo.findAll();
    }

    public void deleteNotification(Long id) {
        notificationRepo.delete(notificationRepo.getById(id));
    }

    public void changeNotificationStatus(Long id) {
        Notification updatedNotification = notificationRepo.getById(id);
        updatedNotification.setChecked(true);
        notificationRepo.save(updatedNotification);
    }
}
