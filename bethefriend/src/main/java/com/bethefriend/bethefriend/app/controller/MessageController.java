package com.bethefriend.bethefriend.app.controller;

import com.bethefriend.bethefriend.app.usecase.message.FindMessageBetweenUsers;
import com.bethefriend.bethefriend.app.usecase.message.FindMessageByUser;
import com.bethefriend.bethefriend.app.usecase.message.SendMessage;
import com.bethefriend.bethefriend.domain.Message;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
public class MessageController {

    private final SendMessage sendMessageUseCase;
    private final FindMessageBetweenUsers findMessagesBetweenUsersUseCase;
    private final FindMessageByUser findMessagesByUserUseCase;

    public MessageController(
        SendMessage sendMessageUseCase,
        FindMessageBetweenUsers findMessagesBetweenUsersUseCase,
        FindMessageByUser findMessagesByUserUseCase) {
            this.sendMessageUseCase = sendMessageUseCase;
            this.findMessagesBetweenUsersUseCase = findMessagesBetweenUsersUseCase;
            this.findMessagesByUserUseCase = findMessagesByUserUseCase;
    }

    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestBody Message sendMessage) {
        Message newMessage = sendMessageUseCase.sendMessage(sendMessage);
        return ResponseEntity.status(HttpStatus.CREATED).body(newMessage);
    }

    @GetMapping("/chat")
    public ResponseEntity<List<Message>> getMessagesBetweenUsers(@RequestParam Long userId) {
        return ResponseEntity.ok(findMessagesBetweenUsersUseCase.getMessages(userId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Message>> getMessagesByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(findMessagesByUserUseCase.getMessages(userId));
    }
}