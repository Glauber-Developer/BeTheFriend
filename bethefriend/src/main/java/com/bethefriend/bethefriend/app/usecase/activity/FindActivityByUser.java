package com.bethefriend.bethefriend.app.usecase.activity;

import org.springframework.stereotype.Service;

import com.bethefriend.bethefriend.domain.Activity;
import com.bethefriend.bethefriend.domain.user.ActivityDTO;
import com.bethefriend.bethefriend.domain.user.UserDTO;
import com.bethefriend.bethefriend.infrastructure.repositories.ActivityRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FindActivityByUser {

    private final ActivityRepository activityRepository;

    public FindActivityByUser(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public List<ActivityDTO> getActivitiesByUser(Long userId) {
        List<Activity> activities = activityRepository.findBySeniorIdOrVoluntarioId(userId, userId);
        return activities.stream().map(activity -> {
            ActivityDTO activityDTO = new ActivityDTO();
            activityDTO.setId(activity.getId());
            activityDTO.setTitle(activity.getTitle());
            activityDTO.setDate(activity.getDate().toString());
            activityDTO.setTime(activity.getTime().toString());
            activityDTO.setActivityType(activity.getActivityType());
            activityDTO.setLocationFormat(activity.getLocationFormat());
            activityDTO.setMeetingLocation(activity.getMeetingLocation());
            activityDTO.setStatus(activity.getStatus());

            // Preencher dados do voluntário
            UserDTO voluntarioDTO = new UserDTO();
            voluntarioDTO.setId(activity.getVoluntario().getId());
            voluntarioDTO.setName(activity.getVoluntario().getName());
            activityDTO.setVoluntario(voluntarioDTO);

            // Preencher dados do sênior
            UserDTO seniorDTO = new UserDTO();
            seniorDTO.setId(activity.getSenior().getId());
            seniorDTO.setName(activity.getSenior().getName());
            activityDTO.setSenior(seniorDTO);

            return activityDTO;
        }).collect(Collectors.toList());
    }
}