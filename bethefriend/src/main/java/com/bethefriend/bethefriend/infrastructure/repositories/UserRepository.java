package com.bethefriend.bethefriend.infrastructure.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.bethefriend.bethefriend.domain.user.User;
import com.bethefriend.bethefriend.domain.user.UserType;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    UserDetails findByEmail(String email);
    List<User> findByUserType(UserType type);
}
