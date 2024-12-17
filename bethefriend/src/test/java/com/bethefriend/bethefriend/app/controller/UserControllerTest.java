package com.bethefriend.bethefriend.app.controller;

import com.bethefriend.bethefriend.app.usecase.user.FindUser;
import com.bethefriend.bethefriend.app.usecase.user.UpdateUser;
import com.bethefriend.bethefriend.domain.user.User;
import com.bethefriend.bethefriend.domain.user.UserType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class UserControllerTest {

    @Mock
    private FindUser findUserUseCase;

    @Mock
    private UpdateUser updateUser;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetUser() {
        User user = new User();
        user.setId(1L);
        when(findUserUseCase.getUserById(1L)).thenReturn(user);

        ResponseEntity<User> response = userController.getUser(1L);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(user, response.getBody());
    }

    @Test
    public void testGetAllUsers() {
        User user1 = new User();
        User user2 = new User();
        List<User> users = Arrays.asList(user1, user2);
        when(findUserUseCase.getAll()).thenReturn(users);

        ResponseEntity<List<User>> response = userController.getAllUsers();

        assertEquals(200, response.getStatusCode().value());
        assertEquals(users, response.getBody());
    }

    @Test
    public void testGetUsersByType() {
        User user = new User();
        List<User> users = Arrays.asList(user);
        when(findUserUseCase.getUsersByType(UserType.SENIOR)).thenReturn(users);

        List<User> response = userController.getUsersByType(UserType.SENIOR);

        assertEquals(users, response);
    }

    @Test
    public void testUpdateUser() {
        User user = new User();
        doNothing().when(updateUser).updateUser(1L, user);

        ResponseEntity<?> response = userController.updateUser(1L, user);

        assertEquals(200, response.getStatusCode().value());
        assertEquals("Usuário atualizado com sucesso!", response.getBody());
    }

    @Test
    public void testGetAuthenticatedUser() {
        UserDetails userDetails = mock(UserDetails.class);
        when(userDetails.getUsername()).thenReturn("test@example.com");
        when(findUserUseCase.getUserByEmail("test@example.com")).thenReturn(userDetails);

        ResponseEntity<UserDetails> response = userController.getAuthenticatedUser(userDetails);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(userDetails, response.getBody());
    }
}