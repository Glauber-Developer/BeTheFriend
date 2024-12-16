package com.bethefriend.bethefriend.app.usecase.user;

import com.bethefriend.bethefriend.domain.user.User;
import com.bethefriend.bethefriend.infrastructure.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpdateUser {

    @Autowired
    private UserRepository userRepository;

    public void updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setCity(user.getCity());
        existingUser.setCountry(user.getCountry());
        existingUser.setPassword(user.getPassword());
        existingUser.setSkills(user.getSkills());
        existingUser.setState(user.getState());
        existingUser.setType(user.getType());
        userRepository.save(existingUser);
    }
}
