package com.bethefriend.bethefriend.app.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bethefriend.bethefriend.app.usecase.activity.CreateActivity;
import com.bethefriend.bethefriend.app.usecase.activity.FindActivityByUser;
import com.bethefriend.bethefriend.app.usecase.activity.FindAllActivities;
import com.bethefriend.bethefriend.app.usecase.activity.UpdateActivityByUser;
import com.bethefriend.bethefriend.domain.Activity;
import com.bethefriend.bethefriend.domain.user.ActivityDTO;

import java.util.List;


@RestController
@RequestMapping("/activities")
public class ActivityController {

    private final CreateActivity createActivityUseCase;
    private final FindAllActivities findAllActivitiesUseCase;
    private final FindActivityByUser findActivitiesByUserUseCase;
    private final UpdateActivityByUser updateActivitiesByUserUseCase;

    public ActivityController(
        CreateActivity createActivityUseCase,
        FindAllActivities findAllActivitiesUseCase,
        FindActivityByUser findActivitiesByUserUseCase, 
        UpdateActivityByUser updateActivitiesByUserUseCase) {
        this.createActivityUseCase = createActivityUseCase;
        this.findAllActivitiesUseCase = findAllActivitiesUseCase;
        this.findActivitiesByUserUseCase = findActivitiesByUserUseCase;
        this.updateActivitiesByUserUseCase = updateActivitiesByUserUseCase;
    }

    @PostMapping
    public ResponseEntity<Activity> createActivity(@RequestBody Activity activity) {
        Activity newActivity = createActivityUseCase.createActivity(activity);
        return ResponseEntity.status(HttpStatus.CREATED).body(newActivity);
    }
    @PutMapping("/{userId}")
    public ResponseEntity<Activity> updateActivity(@PathVariable Long userId, @RequestBody Activity activity) {
        Activity updateActivity = updateActivitiesByUserUseCase.updateActivity(userId, activity);       
        return ResponseEntity.status(HttpStatus.OK).body(updateActivity);
    }

    @GetMapping
    public ResponseEntity<List<Activity>> getAllActivities() {
        return ResponseEntity.ok(findAllActivitiesUseCase.getAllActivities());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ActivityDTO>> getActivitiesByUser(@PathVariable Long userId) {
        List<ActivityDTO> activities = findActivitiesByUserUseCase.getActivitiesByUser(userId);
        return ResponseEntity.ok(activities);
    }
}