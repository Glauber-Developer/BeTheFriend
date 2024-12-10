package com.bethefriend.bethefriend.domain.user;

public record AuthenticationDTO(String email, String password) {
        
        public AuthenticationDTO {
            if (email == null || email.isBlank()) {
                throw new IllegalArgumentException("Email cannot be null or empty");
            }
            if (password == null || password.isBlank()) {
                throw new IllegalArgumentException("Password cannot be null or empty");
            }
        }
}
