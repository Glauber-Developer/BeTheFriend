package com.bethefriend.bethefriend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

import com.bethefriend.bethefriend.domain.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;

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
@Table(name = "activities")
public class Activity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "senior_id", nullable = false)
    @JsonBackReference(value = "senior-activities")
    private User senior;

    @ManyToOne
    @JoinColumn(name = "voluntario_id", nullable = false)
    @JsonBackReference(value = "voluntario-activities")
    private User voluntario;
    
    private String title;
    private LocalDateTime dateHour;
    private String description;
    private String status;

    public Activity(String title, String description, LocalDateTime dateHour, User senior, User voluntario) {
        this.title = title;
        this.description = description;
        this.dateHour = dateHour;
        this.senior = senior;
        this.voluntario = voluntario;
    }
}