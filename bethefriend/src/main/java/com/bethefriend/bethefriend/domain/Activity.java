package com.bethefriend.bethefriend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.time.LocalTime;

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
    @JoinColumn(name = "senior", nullable = false)
    @JsonBackReference(value = "senior-activities")
    private User senior;

    @ManyToOne
    @JoinColumn(name = "voluntario", nullable = false)
    @JsonBackReference(value = "voluntario-activities")
    private User voluntario;

    private String title;
    private LocalDate date;
    private LocalTime time;
    private String description;
    private String status;
    private String activityType;
    private String locationFormat; 
    private String meetingLocation; 

    public Activity(String title, String description, LocalDate date, LocalTime time, String activityType,
                    String locationFormat, String meetingLocation, User senior, User voluntario) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.time = time;
        this.activityType = activityType;
        this.locationFormat = locationFormat;
        this.meetingLocation = meetingLocation;
        this.senior = senior;
        this.voluntario = voluntario;
    }
}