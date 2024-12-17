package com.bethefriend.bethefriend.app.controller;

import com.bethefriend.bethefriend.domain.user.User;
import com.bethefriend.bethefriend.domain.user.UserType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.http.*;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("test")
public class UserControllerIntegrationTest {

    @Autowired
    private UserController userController;

    @Test
    public void testGetUser() {
        ResponseEntity<User> response = userController.getUser(1L);

        assertEquals(200, response.getStatusCode().value());
    }

    @Test
    public void testGetAllUsers() {
        ResponseEntity<List<User>> response = userController.getAllUsers();

        assertEquals(200, response.getStatusCode().value());
    }

    @Test
    public void testGetUsersByType() {
        List<User> response = userController.getUsersByType(UserType.SENIOR);

        assertEquals(false, response.isEmpty());
    }

    @Test
    public void testUpdateUser() {
        User user = new User();
        ResponseEntity<?> response = userController.updateUser(1L, user);

        assertEquals(200, response.getStatusCode().value());
        assertEquals("Usuário atualizado com sucesso!", response.getBody());
    }
}