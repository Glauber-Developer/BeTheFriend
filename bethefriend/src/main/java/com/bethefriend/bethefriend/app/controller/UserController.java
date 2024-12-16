package com.bethefriend.bethefriend.app.controller;

import com.bethefriend.bethefriend.app.usecase.user.FindUser;
import com.bethefriend.bethefriend.app.usecase.user.UpdateUser;
import com.bethefriend.bethefriend.domain.user.User;
import com.bethefriend.bethefriend.domain.user.UserType;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    
    private final FindUser findUserUseCase;
    private final UpdateUser updateUser;

    public UserController(FindUser findUserUseCase, UpdateUser updateUser) {
        this.findUserUseCase = findUserUseCase;
        this.updateUser = updateUser;
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = findUserUseCase.getUserById(id);
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

    @GetMapping("/seniors")
    public List<User> getSeniorsByFilters(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String country) {
        return findUserUseCase.getSeniorsByFilters(UserType.SENIOR, city, state, country);
    }

    @GetMapping("/volunteers")
    public List<User> getVolunteersByFilters(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String country,
            @RequestParam(required = false) List<String> skills) {
        return findUserUseCase.getVolunteersByFilters(UserType.VOLUNTARIO, city, state, country, skills);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User user) {
        try {
            updateUser.updateUser(id, user);
            return ResponseEntity.ok("Usuário atualizado com sucesso!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<UserDetails> getAuthenticatedUser(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        UserDetails user = findUserUseCase.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }
}