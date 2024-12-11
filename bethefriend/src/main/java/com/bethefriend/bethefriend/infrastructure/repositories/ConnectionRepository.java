package com.bethefriend.bethefriend.infrastructure.repositories;

import com.bethefriend.bethefriend.domain.connetion.Connection;
import com.bethefriend.bethefriend.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConnectionRepository extends JpaRepository<Connection, Long> {

    List<Connection> findByRequesterOrRequested(User requesterId, User requestedId);
}


