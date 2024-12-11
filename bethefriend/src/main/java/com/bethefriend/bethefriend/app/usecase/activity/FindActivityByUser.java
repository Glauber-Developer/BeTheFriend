package com.bethefriend.bethefriend.app.usecase.activity;

import org.springframework.stereotype.Service;

import com.bethefriend.bethefriend.domain.Activity;
import com.bethefriend.bethefriend.infrastructure.repositories.ActivityRepository;

import java.util.List;

@Service
public class FindActivityByUser {

    private final ActivityRepository activityRepository;

    public FindActivityByUser(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public List<Activity> getActivityByUser(Long userId) {
        return activityRepository.findBySeniorIdOrVoluntarioId(userId, userId);
    }
}