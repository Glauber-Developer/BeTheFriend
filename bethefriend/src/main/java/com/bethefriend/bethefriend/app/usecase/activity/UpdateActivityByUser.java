package com.bethefriend.bethefriend.app.usecase.activity;

import org.springframework.stereotype.Service;

import com.bethefriend.bethefriend.domain.Activity;
import com.bethefriend.bethefriend.infrastructure.repositories.ActivityRepository;

@Service
public class UpdateActivityByUser {

    private final ActivityRepository activityRepository;

    public UpdateActivityByUser(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public Activity updateActivity(Long userId, Activity activity) {
        Activity existingActivity = activityRepository.findById(activity.getId()).orElseThrow(() -> new RuntimeException("Activity not found"));
        existingActivity.setTitle(activity.getTitle());
        existingActivity.setDate(activity.getDate());
        existingActivity.setTime(activity.getTime());
        existingActivity.setActivityType(activity.getActivityType());
        existingActivity.setLocationFormat(activity.getLocationFormat());
        existingActivity.setMeetingLocation(activity.getMeetingLocation());
        existingActivity.setStatus(activity.getStatus());
        return activityRepository.save(existingActivity);
    }

    public Activity updateActivityStatus(Long activityId, String status) {
        Activity existingActivity = activityRepository.findById(activityId).orElseThrow(() -> new RuntimeException("Activity not found"));
        existingActivity.setStatus(status);
        return activityRepository.save(existingActivity);
    }
}