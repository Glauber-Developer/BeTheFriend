package com.bethefriend.bethefriend.app.controller;

import com.bethefriend.bethefriend.app.usecase.user.FindUser;
import com.bethefriend.bethefriend.domain.user.User;
import com.bethefriend.bethefriend.domain.user.UserType;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    
    private final FindUser findUserUseCase;

    public UserController(FindUser findUserUseCase) {
        this.findUserUseCase = findUserUseCase;
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = findUserUseCase.execute(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(findUserUseCase.getAll());
    }

    @GetMapping("/type/{type}")
    public List<User> getUsersByType(@PathVariable UserType type) {
        return findUserUseCase.getUsersByType(type);
    }
}