package com.bethefriend.bethefriend.app.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bethefriend.bethefriend.app.service.TokenService;
import com.bethefriend.bethefriend.domain.user.AuthenticationDTO;
import com.bethefriend.bethefriend.domain.user.LoginResponseDTO;
import com.bethefriend.bethefriend.domain.user.RegisterDTO;
import com.bethefriend.bethefriend.domain.user.User;
import com.bethefriend.bethefriend.infrastructure.repositories.UserRepository;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/auth")    
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationDTO loginRequest) {
    try {
        var authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password())
        );

        var user = (User) authentication.getPrincipal();
        String token = tokenService.generateToken(user);

        return ResponseEntity.ok(new LoginResponseDTO(token));
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha inválidos");
    }
}

    @PostMapping("/register")
    public ResponseEntity<Long> register(@RequestBody @Valid RegisterDTO RegisterDTO) {
        if(this.userRepository.findByEmail(RegisterDTO.email()) != null) {
            return ResponseEntity.badRequest().build();
        } String encryptedPassword = new BCryptPasswordEncoder().encode(RegisterDTO.password());
        User newUser = new User(
            RegisterDTO.name(),
            RegisterDTO.email(),
            encryptedPassword,
            RegisterDTO.city(), 
            RegisterDTO.state(), 
            RegisterDTO.country(), 
            RegisterDTO.skills(), 
            RegisterDTO.typeUser()
        );

        this.userRepository.save(newUser);
        return ResponseEntity.ok().build();
    }
    
}
