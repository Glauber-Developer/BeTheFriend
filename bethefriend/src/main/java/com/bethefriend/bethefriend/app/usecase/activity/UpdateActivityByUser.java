package com.bethefriend.bethefriend.app.usecase.activity;

import org.springframework.stereotype.Service;

import com.bethefriend.bethefriend.domain.Activity;
import com.bethefriend.bethefriend.infrastructure.repositories.ActivityRepository;
import com.bethefriend.bethefriend.infrastructure.repositories.UserRepository;

@Service
public class UpdateActivityByUser {

    private final ActivityRepository activityRepository;
    // private final UserRepository userRepository;

    public UpdateActivityByUser(ActivityRepository activityRepository, UserRepository userRepository) {
        this.activityRepository = activityRepository;
        // this.userRepository = userRepository;
    }

    public Activity updateActivity(Long userId, Activity activity) {
        
        Activity updateActivity = activityRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("Atividade não encontrada"));
        updateActivity.setStatus(activity.getStatus());   

        // userRepository.findById(activity.getSenior().getId())
        //               .orElseThrow(() -> new IllegalArgumentException("Usuário Senior com ID " 
        //                                       + activity.getSenior().getId() + " não encontrado."));

        
        // userRepository.findById(activity.getVoluntario().getId())
        //               .orElseThrow(() -> new IllegalArgumentException("Usuário Voluntário com ID " 
        //                                       + activity.getVoluntario().getId() + " não encontrado."));

        
        return activityRepository.save(updateActivity);
    }
}
