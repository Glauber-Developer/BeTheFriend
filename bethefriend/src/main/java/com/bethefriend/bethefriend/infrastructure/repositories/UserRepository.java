package com.bethefriend.bethefriend.infrastructure.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.bethefriend.bethefriend.domain.user.User;
import com.bethefriend.bethefriend.domain.user.UserType;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    UserDetails findByEmail(String email);
    List<User> findByType(UserType type);
    List<User> findByTypeAndCityAndStateAndCountry(UserType type, String city, String state, String country);
    List<User> findVolunteersByTypeAndCityAndStateAndCountryAndSkills(UserType type, String city, String state, String country, List<String> skills);
}
