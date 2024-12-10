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
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthenticationDTO authenticationDTO) {
        var userPassaword = new UsernamePasswordAuthenticationToken(authenticationDTO.email(), authenticationDTO.password());
        var auth = this.authenticationManager.authenticate(userPassaword);

        var token = tokenService.generateToken((User)auth.getPrincipal());
        return ResponseEntity.ok(new LoginResponseDTO(token));
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
