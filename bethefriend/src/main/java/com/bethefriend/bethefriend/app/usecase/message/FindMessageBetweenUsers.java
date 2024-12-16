package com.bethefriend.bethefriend.app.usecase.message;

import org.springframework.stereotype.Service;

import com.bethefriend.bethefriend.domain.message.Message;
import com.bethefriend.bethefriend.infrastructure.repositories.MessageRepository;

import java.util.List;

@Service
public class FindMessageBetweenUsers {

    private final MessageRepository messageRepository;

    public FindMessageBetweenUsers(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<Message> getMessages(Long userId1, Long userId2) {
        return messageRepository.findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(userId1, userId2, userId1, userId2);
    }
}