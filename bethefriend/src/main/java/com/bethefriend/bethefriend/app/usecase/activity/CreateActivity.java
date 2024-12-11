package com.bethefriend.bethefriend.app.usecase.activity;

import org.springframework.stereotype.Service;

import com.bethefriend.bethefriend.domain.Activity;
import com.bethefriend.bethefriend.domain.user.User;
import com.bethefriend.bethefriend.infrastructure.repositories.ActivityRepository;
import com.bethefriend.bethefriend.infrastructure.repositories.UserRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CreateActivity {

    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;

    public CreateActivity(ActivityRepository activityRepository, UserRepository userRepository) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
    }

    public Activity createActivity(Activity activity) {
        Optional<User> senior = userRepository.findById(activity.getSenior().getId());
        if (senior.isEmpty()) {
            throw new IllegalArgumentException("Senior não encontrado");
        }
        Optional<User> voluntario = userRepository.findById(activity.getVoluntario().getId());
        if (voluntario.isEmpty()) {
            throw new IllegalArgumentException("Voluntário não encontrado");
        }
        activity.setSenior(senior.get());
        activity.setVoluntario(voluntario.get());
        activity.setDateHour(LocalDateTime.now());
        return activityRepository.save(activity);
    }
}