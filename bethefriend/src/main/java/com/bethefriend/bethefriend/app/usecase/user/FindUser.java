package com.bethefriend.bethefriend.app.usecase.user;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.bethefriend.bethefriend.domain.user.User;
import com.bethefriend.bethefriend.domain.user.UserType;
import com.bethefriend.bethefriend.infrastructure.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class FindUser {

    private final UserRepository userRepository;

    public FindUser(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public List<User> getUsersByType(UserType type) {
        return userRepository.findByType(type);
    }

    public List<User> getSeniorsByFilters(UserType type, String city, String state, String country) {
        return userRepository.findByTypeAndCityAndStateAndCountry(type, city, state, country);
    }

    public List<User> getVolunteersByFilters(UserType type, String city, String state, String country, List<String> skills) {
        return userRepository.findVolunteersByTypeAndCityAndStateAndCountryAndSkills(type, city, state, country, skills);
    }

    public UserDetails getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}