package com.bethefriend.bethefriend.domain.user;

import java.util.List;

public record RegisterDTO(String state, String country, String password, String email, String name, List<String> skills,  String city, UserType typeUser) {
        
        public RegisterDTO {
            if (name == null || name.isBlank()) {
                throw new IllegalArgumentException("Username cannot be null or empty");
            }
            if (password == null || password.isBlank()) {
                throw new IllegalArgumentException("Password cannot be null or empty");
            }
            if (email == null || email.isBlank()) {
                throw new IllegalArgumentException("Email cannot be null or empty");
            }
            if (typeUser == null) {
                throw new IllegalArgumentException("UserType cannot be null");
            }
        }

       

}
