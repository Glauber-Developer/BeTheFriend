package com.bethefriend.bethefriend.app.controller;


import com.bethefriend.bethefriend.app.service.ConnectionService;
import com.bethefriend.bethefriend.domain.connetion.Connection;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/connections")
public class ConnectionController {

    private final ConnectionService connectionService;

    public ConnectionController(ConnectionService connectionService) {
        this.connectionService = connectionService;
    }

    @PostMapping("/send-request")
    public ResponseEntity<Connection> sendRequest(@RequestParam Long requesterId, @RequestParam Long requestedId) {
        return ResponseEntity.ok(connectionService.sendRequest(requesterId, requestedId));
    }

    @PutMapping("/{connectionId}/accept")
    public ResponseEntity<String> acceptConnection(@PathVariable Long connectionId) {
        connectionService.acceptConnection(connectionId);
        return ResponseEntity.ok("Conexão aceita com sucesso!");
    }

    @PutMapping("/{connectionId}/reject")
    public ResponseEntity<String> rejectConnection(@PathVariable Long connectionId) {
        connectionService.rejectConnection(connectionId);
        return ResponseEntity.ok("Conexão rejeitada com sucesso!");
    }
    @GetMapping("/{userId}")
    public ResponseEntity<List<Connection>> getConnections(@PathVariable Long userId) {
        return ResponseEntity.ok(connectionService.getConnections(userId));
    }
}
