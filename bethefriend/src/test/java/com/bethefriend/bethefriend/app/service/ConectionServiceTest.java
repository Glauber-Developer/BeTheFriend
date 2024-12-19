package com.bethefriend.bethefriend.app.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.bethefriend.bethefriend.domain.connetion.Connection;
import com.bethefriend.bethefriend.domain.connetion.ConnectionStatus;
import com.bethefriend.bethefriend.infrastructure.repositories.ConnectionRepository;

@ExtendWith(MockitoExtension.class)
public class ConectionServiceTest {
    
    @InjectMocks
    private ConnectionService connectionService;
    @Mock
    private ConnectionRepository connectionRepository;

    @Test
    void acceptConnection_whenConnectionNotFound_thenThrowsRuntimeException() {
        when(connectionRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, 
            () -> connectionService.acceptConnection(1L));

        assertEquals("Conexão não encontrada com o ID: 1", exception.getMessage());
    }

        @Test
    void acceptConnection_whenConnectionNotPending_thenThrowsIllegalStateException() {
        Connection connection = createConnection(ConnectionStatus.ACCEPTED);

        when(connectionRepository.findById(1L)).thenReturn(Optional.of(connection));

        IllegalStateException exception = assertThrows(IllegalStateException.class, 
            () -> connectionService.acceptConnection(1L));

        assertEquals("A conexão não está em estado PENDING.", exception.getMessage());
    }

    @Test
    void acceptConnection_whenConnectionIsPending_thenAcceptConnection() {
        Connection connection = createConnection(ConnectionStatus.PENDING);

        when(connectionRepository.findById(1L)).thenReturn(Optional.of(connection));

        connectionService.acceptConnection(1L);

        assertEquals(ConnectionStatus.ACCEPTED, connection.getStatus());
        verify(connectionRepository, times(1)).save(connection);
    }


    private Connection createConnection(ConnectionStatus status) {
        Connection connection = new Connection();
        connection.setId(1L);
        connection.setStatus(status);
        return connection;
    }
}
