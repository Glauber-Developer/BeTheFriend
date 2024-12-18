package com.bethefriend.bethefriend.domain.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActivityDTO {
    private Long id;
    private String title;
    private String date;
    private String time;
    private String activityType;
    private String locationFormat;
    private String meetingLocation;
    private String status;
    private UserDTO voluntario;
    private UserDTO senior;

}
