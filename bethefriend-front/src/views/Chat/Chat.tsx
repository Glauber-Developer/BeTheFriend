import React, { useEffect, useState } from "react";
import './Chat.css';
import MenuBarUser from "../../components/menu-bar/menu-bar-user.tsx";
import axios from "axios";

interface Message {
  id: number;
  sender: {
    id: number;
    name: string;
  };
  content: string;
}

interface User {
  id: number;
  name: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [userId] = useState<number>(1); 
  const [chatUserId] = useState<number>(2); 
  const [chatUser, setChatUser] = useState<User | null>(null); 

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token de autenticação não encontrado. Por favor, faça login novamente.");
        return;
      }

      const response = await axios.get(`http://localhost:8081/messages/chat`, {
        params: { userId1: userId, userId2: chatUserId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const formattedMessages = response.data.map((msg: { id: number; senderId: number; senderName: string; content: string }) => ({
        id: msg.id,
        sender: {
          id: msg.senderId,
          name: msg.senderName,
        },
        content: msg.content,
      }));

      setMessages(formattedMessages);

      const userResponse = await axios.get(`http://localhost:8081/users/${chatUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setChatUser(userResponse.data); 
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
      alert("Ocorreu um erro ao buscar as mensagens. Tente novamente.");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [userId, chatUserId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const newMessageObj = {
        sender: { id: userId },
        receiver: { id: chatUserId },
        content: newMessage,
      };

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Token de autenticação não encontrado. Por favor, faça login novamente.");
          return;
        }

        await axios.post(`http://localhost:8081/messages`, newMessageObj, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

       
        fetchMessages();
        setNewMessage(""); 
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        alert("Ocorreu um erro ao enviar a mensagem. Tente novamente.");
      }
    }
  };

  return (
    <div className="chat-container">
      {/* Menu Superior */}
      <header className="menu-bar">
        <MenuBarUser />
      </header>
      {/* LEFT */}
      <div className="left-section">
        <div className="chat-box">
          <div className="chat-header">
            <span className="chat-icon">👤</span>
            <div>
              <h2 className="chat-title">Bate-papo com</h2>
              <p className="chat-user-name">{chatUser ? chatUser.name : "Carregando..."}</p>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              message?.id ? (
                <div
                  key={message.id}
                  className={`chat-message ${message.sender.id === userId ? 'sent' : 'received'}`}
                >
                  <label className="message-label">{message.sender.id === userId ? 'Você' : message.sender.name}</label>
                  <div className="message-content">{message.content}</div>
                </div>
              ) : (
                <div key={`placeholder-${index}`} className="chat-message error">
                  Mensagem inválida ou não encontrada.
                </div>
              )
            ))}
          </div>

          <div className="chat-input-box">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="chat-input"
            />
            <button onClick={handleSendMessage} className="send-button">Enviar</button>
          </div>
        </div>
      </div>
      <div className="right-section">
        <div className="scheduled-users">
          <h3>Usuários com atividades agendadas</h3>

          //TODO: alterar o  caminho do user (pegar o user do backend)
          <ul>
            {staticUsers.map((user) => (
              <li key={user.id}>
                <button
                  onClick={() => handleSelectUser(user.id)}
                  className="user-button"
                >
                  <span>👤</span>
                  {user.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Chat;
