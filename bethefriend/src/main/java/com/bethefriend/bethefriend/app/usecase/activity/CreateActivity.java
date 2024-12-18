package com.bethefriend.bethefriend.app.usecase.activity;

import org.springframework.stereotype.Service;

import com.bethefriend.bethefriend.domain.Activity;
import com.bethefriend.bethefriend.domain.user.User;
import com.bethefriend.bethefriend.infrastructure.repositories.ActivityRepository;
import com.bethefriend.bethefriend.infrastructure.repositories.UserRepository;

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

        if (activity.getActivityType() == null || activity.getActivityType().isEmpty()) {
            throw new IllegalArgumentException("O tipo de atividade é obrigatório");
        }
        if (activity.getLocationFormat() == null || activity.getLocationFormat().isEmpty()) {
            throw new IllegalArgumentException("O formato do local é obrigatório");
        }
        if (activity.getMeetingLocation() == null || activity.getMeetingLocation().isEmpty()) {
            throw new IllegalArgumentException("O local de encontro é obrigatório");
        }

        activity.setSenior(senior.get());
        activity.setVoluntario(voluntario.get());
        activity.setStatus("Pendente");
        activity.setDate(activity.getDate());
        activity.setTime(activity.getTime());
        return activityRepository.save(activity);
    }
}