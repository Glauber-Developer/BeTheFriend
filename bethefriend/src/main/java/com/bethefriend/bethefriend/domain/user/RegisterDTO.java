package com.bethefriend.bethefriend.domain.user;

public record RegisterDTO(String state, String country, String password, String email, String name, String skills,  String city, UserType type) {
        
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
            if (type == null) {
                throw new IllegalArgumentException("UserType cannot be null");
            }
        }

       

}
