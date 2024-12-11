package com.bethefriend.bethefriend.domain.user;

public enum UserType {
    SENIOR("senior"),
    VOLUNTARIO("voluntario");

    private String type;

    UserType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
