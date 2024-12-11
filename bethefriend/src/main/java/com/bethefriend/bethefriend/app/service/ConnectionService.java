package com.bethefriend.bethefriend.app.service;



import com.bethefriend.bethefriend.domain.connetion.Connection;
import com.bethefriend.bethefriend.domain.connetion.ConnectionStatus;
import com.bethefriend.bethefriend.domain.user.User;
import com.bethefriend.bethefriend.domain.user.UserType;
import com.bethefriend.bethefriend.infrastructure.repositories.ConnectionRepository;
import com.bethefriend.bethefriend.infrastructure.repositories.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConnectionService {

    private final ConnectionRepository connectionRepository;
    private final UserRepository userRepository;

    public ConnectionService(ConnectionRepository connectionRepository, UserRepository userRepository) {
        this.connectionRepository = connectionRepository;
        this.userRepository = userRepository;
    }

    public Connection sendRequest(Long requesterId, Long requestedId) {
        User requester = userRepository.findById(requesterId)
                .orElseThrow(() -> new RuntimeException("Usuário solicitante não encontrado"));
        User requested = userRepository.findById(requestedId)
                .orElseThrow(() -> new RuntimeException("Usuário solicitado não encontrado"));

        if (requester.getType() == requested.getType()) {
            throw new IllegalArgumentException("Conexão entre os tipos de usuarios não permitida.");
        }

        Connection connection = new Connection();
        connection.setRequester(requester);
        connection.setRequested(requested);
        connection.setStatus(ConnectionStatus.PENDING);

        return connectionRepository.save(connection);
    }

    public List<Connection> getConnections(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o ID: " + userId));

        return connectionRepository.findByRequesterOrRequested(user, user)
                .stream()
                .filter(connection -> {
                    if (user.getType() == UserType.SENIOR) {
                        return connection.getRequested().getType() == UserType.VOLUNTARIO ||
                               connection.getRequester().getType() == UserType.VOLUNTARIO;
                    } else if (user.getType() == UserType.VOLUNTARIO) {
                        return connection.getRequested().getType() == UserType.SENIOR ||
                               connection.getRequester().getType() == UserType.SENIOR;
                    }
                    return false;
                })
                .collect(Collectors.toList());
    }

    public void acceptConnection(Long connectionId) {
        Connection connection = connectionRepository.findById(connectionId)
                .orElseThrow(() -> new RuntimeException("Conexão não encontrada com o ID: " + connectionId));

        if (connection.getStatus() != ConnectionStatus.PENDING) {
            throw new IllegalStateException("A conexão não está em estado PENDING.");
        }

        connection.setStatus(ConnectionStatus.ACCEPTED);
        connectionRepository.save(connection);
    }

    public void rejectConnection(Long connectionId) {
        Connection connection = connectionRepository.findById(connectionId)
                .orElseThrow(() -> new RuntimeException("Conexão não encontrada com o ID: " + connectionId));

        if (connection.getStatus() != ConnectionStatus.PENDING) {
            throw new IllegalStateException("A conexão não está em estado PENDING.");
        }

        connection.setStatus(ConnectionStatus.REJECTED);
        connectionRepository.save(connection);
    }
}
