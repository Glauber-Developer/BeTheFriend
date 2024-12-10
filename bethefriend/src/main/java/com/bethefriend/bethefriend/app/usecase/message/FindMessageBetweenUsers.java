package com.bethefriend.bethefriend.app.usecase.message;

import org.springframework.stereotype.Service;

import com.bethefriend.bethefriend.domain.Message;
import com.bethefriend.bethefriend.infrastructure.repositories.MessageRepository;

import java.util.List;

@Service
public class FindMessageBetweenUsers {

    private final MessageRepository messageRepository;

    public FindMessageBetweenUsers(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<Message> getMessages(Long userId) {
        return messageRepository.findBySenderIdAndReceiverId(userId);
    }
}