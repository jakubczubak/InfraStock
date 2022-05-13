package com.example.infrastock.notification;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/notifications")
    public List<Notification> getNotificationList() {
        return notificationService.getNotificationList();
    }

    @DeleteMapping("/deleteNotification")
    public void deleteNotification(@RequestParam Long id) {
        notificationService.deleteNotification(id);
    }

    @PutMapping("/changeStatus")
    public void changeStatus(@RequestParam Long id) {
        notificationService.changeNotificationStatus(id);
    }
}
