package com.bethefriend.bethefriend.domain.message;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageDTO {
    private Long id;
    private String content;
    private LocalDateTime dateHour;
    private Long senderId;
    private String senderName;
    private Long receiverId;
    private String receiverName;

    public MessageDTO(Message message) {
        this.id = message.getId();
        this.content = message.getContent();
        this.dateHour = message.getDateHour();
        this.senderId = message.getSender().getId();
        this.senderName = message.getSender().getName();
        this.receiverId = message.getReceiver().getId();
        this.receiverName = message.getReceiver().getName();
    }
}


