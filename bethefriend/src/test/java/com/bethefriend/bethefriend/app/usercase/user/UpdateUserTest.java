package com.bethefriend.bethefriend.app.usercase.user;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.bethefriend.bethefriend.app.usecase.user.UpdateUser;
import com.bethefriend.bethefriend.domain.user.User;
import com.bethefriend.bethefriend.domain.user.UserType;
import com.bethefriend.bethefriend.infrastructure.repositories.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UpdateUserTest {

    @InjectMocks
    private UpdateUser updateUser;
    @Mock
    private UserRepository userRepository;

    @Test
    void updateUser_whenUserNotExists_thenThrowsIllegalArgumentException() {
        User user = createUser();

        when(userRepository.findById(1L)).thenReturn(Optional.empty());
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> updateUser.updateUser(1L, user));

        assertEquals("Usuário não encontrado", exception.getMessage());
    }

    @Test
    void updateUser_whenUserExists_thenUpdateUser() {
        User existingUser = createUserToUpdate();
        User updatedUser = createUser();
        
        when(userRepository.findById(2L)).thenReturn(Optional.of(existingUser));

        updateUser.updateUser(2L, updatedUser);

        verify(userRepository, times(1)).save(existingUser);

        assertEquals( "Name User", existingUser.getName());
        assertEquals(updatedUser.getEmail(), existingUser.getEmail());
        assertEquals(updatedUser.getCity(), existingUser.getCity());
        assertEquals(updatedUser.getCountry(), existingUser.getCountry());
        assertEquals(updatedUser.getPassword(), existingUser.getPassword());
        assertEquals(updatedUser.getSkills(), existingUser.getSkills());
        assertEquals(updatedUser.getState(), existingUser.getState());
        assertEquals(updatedUser.getType(), existingUser.getType());

    }

    private User createUser() {
        User user = new User();
        user.setName("Name User");
        user.setEmail("user@email.com");
        user.setCity("City");
        user.setCountry("Country");
        user.setPassword("password");
        user.setSkills(List.of("skill 1", "skill 2"));
        user.setState("State");
        user.setType(UserType.VOLUNTARIO);

        return user;
    }

    private User createUserToUpdate() {
        User user = new User();
        user.setName("Old Name User");
        user.setEmail("olduser@email.com");
        user.setCity("Old City");
        user.setCountry("Old Country");
        user.setPassword("oldpassword");
        user.setSkills(List.of("old skill 1"));
        user.setState("Old State");
        user.setType(UserType.SENIOR);

        return user;
    }
    
}
