package com.bethefriend.bethefriend.domain.user;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.bethefriend.bethefriend.domain.Activity;
import com.bethefriend.bethefriend.domain.Message;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "friends")
public class User implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;

    @Column(name = "type")
    @Enumerated(value = jakarta.persistence.EnumType.STRING)
    private UserType type;
    private String city;
    private String state;
    private String country;
    private String skills;

    public User(String name, String email, String password, String city, String state, String country, String skills, UserType type) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.city = city;
        this.state = state;
        this.country = country;
        this.skills = skills;
        this.type = type;
    }

    @OneToMany(mappedBy = "senior")
    @JsonManagedReference(value = "senior-activities")
    private List<Activity> atividadesComoSenior;

    @OneToMany(mappedBy = "voluntario")
    @JsonManagedReference(value = "voluntario-activities")
    private List<Activity> atividadesComoVoluntario;

    @OneToMany(mappedBy = "sender")
    @JsonManagedReference(value = "sender-message")
    private List<Message> sendedMessager;

    @OneToMany(mappedBy = "receiver")
    @JsonManagedReference(value = "receiver-message")
    private List<Message> receiverMessages;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.type == UserType.SENIOR) {
            return List.of(new SimpleGrantedAuthority("ROLE_SENIOR"));
        } return List.of(new SimpleGrantedAuthority("ROLE_VOLUNTARIO"));
    }

    @Override
    public String getUsername() {
        return this.email;
    }
}