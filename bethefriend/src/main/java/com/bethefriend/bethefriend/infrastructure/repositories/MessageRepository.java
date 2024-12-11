package com.bethefriend.bethefriend.infrastructure.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bethefriend.bethefriend.domain.Message;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderIdOrReceiverId(Long userId);
    List<Message> findBySenderIdAndReceiverId(Long userId);
}