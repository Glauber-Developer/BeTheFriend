package com.bethefriend.bethefriend.app.controller;

import com.bethefriend.bethefriend.app.usecase.message.FindMessageBetweenUsers;
import com.bethefriend.bethefriend.app.usecase.message.FindMessageByUser;
import com.bethefriend.bethefriend.app.usecase.message.SendMessage;
import com.bethefriend.bethefriend.domain.message.Message;
import com.bethefriend.bethefriend.domain.message.MessageDTO;

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
    public ResponseEntity<List<MessageDTO>> getMessagesBetweenUsers(@RequestParam Long userId1, @RequestParam Long userId2) {
    List<Message> messages = findMessagesBetweenUsersUseCase.getMessages(userId1, userId2);
    List<MessageDTO> messageDTOs = messages.stream()
                                           .map(MessageDTO::new)
                                           .toList();

    return ResponseEntity.ok(messageDTOs);
}
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Message>> getMessagesByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(findMessagesByUserUseCase.getMessages(userId));
    }
}