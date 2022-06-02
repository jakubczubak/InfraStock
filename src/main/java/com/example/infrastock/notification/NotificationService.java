package com.example.infrastock.notification;

import com.example.infrastock.material.MaterialDTO;
import com.example.infrastock.user.User;
import com.example.infrastock.user.UserRepo;
import org.aspectj.weaver.ast.Not;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepo notificationRepo;
    private final UserRepo userRepo;


    public NotificationService(NotificationRepo notificationRepo, UserRepo userRepo) {
        this.notificationRepo = notificationRepo;
        this.userRepo = userRepo;
    }

    public void sendNotificationToUsers(String message) {

        Object principal = SecurityContextHolder. getContext(). getAuthentication(). getPrincipal();
        Long id = ((User)principal).getId();
        String name = ((User)principal).getUsername();

        List<User> userList = userRepo.findAll();
        userList.remove(userRepo.getById(id));

        for (User user: userList) {
            Notification newNotification = new Notification("<strong>" + name + "</strong>" + " " + message, false);
            user.getNotifications().add(newNotification);
            userRepo.save(user);
            }
    }


    public List<Notification> getNotificationList() {

        Object principal = SecurityContextHolder. getContext(). getAuthentication(). getPrincipal();
        Long id = ((User)principal).getId();

        List<Notification> userNotifications = userRepo.getById(id).getNotifications();

        return userNotifications;
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
