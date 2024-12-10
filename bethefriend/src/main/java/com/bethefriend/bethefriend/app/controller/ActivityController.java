package com.bethefriend.bethefriend.app.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bethefriend.bethefriend.app.usecase.activity.CreateActivity;
import com.bethefriend.bethefriend.app.usecase.activity.FindActivityByUser;
import com.bethefriend.bethefriend.app.usecase.activity.FindAllActivities;
import com.bethefriend.bethefriend.domain.Activity;

import java.util.List;

@RestController
@RequestMapping("/activities")
public class ActivityController {

    private final CreateActivity createActivityUseCase;
    private final FindAllActivities findAllActivitiesUseCase;
    private final FindActivityByUser findActivitiesByUserUseCase;

    public ActivityController(
        CreateActivity createActivityUseCase,
        FindAllActivities findAllActivitiesUseCase,
        FindActivityByUser findActivitiesByUserUseCase) {
        this.createActivityUseCase = createActivityUseCase;
        this.findAllActivitiesUseCase = findAllActivitiesUseCase;
        this.findActivitiesByUserUseCase = findActivitiesByUserUseCase;
    }

    @PostMapping
    public ResponseEntity<Activity> createActivity(@RequestBody Activity activity) {
        Activity newActivity = createActivityUseCase.createActivity(activity);
        return ResponseEntity.status(HttpStatus.CREATED).body(newActivity);
    }

    @GetMapping
    public ResponseEntity<List<Activity>> getAllActivities() {
        return ResponseEntity.ok(findAllActivitiesUseCase.getAllActivities());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Activity>> getActivityByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(findActivitiesByUserUseCase.getActivityByUser(userId));
    }
}