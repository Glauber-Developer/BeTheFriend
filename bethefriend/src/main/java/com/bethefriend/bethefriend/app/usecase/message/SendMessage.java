package com.bethefriend.bethefriend.app.usecase.message;

import org.springframework.stereotype.Service;

import com.bethefriend.bethefriend.domain.message.Message;
import com.bethefriend.bethefriend.domain.user.User;
import com.bethefriend.bethefriend.infrastructure.repositories.MessageRepository;
import com.bethefriend.bethefriend.infrastructure.repositories.UserRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class SendMessage {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    public SendMessage(MessageRepository messageRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    public Message sendMessage(Message message) {
        Optional<User> sender = userRepository.findById(message.getSender().getId());
        if (sender.isEmpty()) {
            throw new IllegalArgumentException("Remetente não encontrado");
        }
        Optional<User> receiver = userRepository.findById(message.getReceiver().getId());
        if (receiver.isEmpty()) {
            throw new IllegalArgumentException("Destinatário não encontrado");
        }
        message.setSender(sender.get());
        message.setReceiver(receiver.get());
        message.setDateHour(LocalDateTime.now());
        return messageRepository.save(message);
    }
}