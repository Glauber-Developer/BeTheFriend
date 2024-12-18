import React, { useEffect, useState } from "react";
import './Chat.css';
import MenuBarUser from "../../components/menu-bar/menu-bar-user";
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
  voluntario: {
    id: number;
  };
  senior: {
    id: number;
  };
}

interface Activity {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string | null;
  activityType: string;
  locationFormat: string;
  meetingLocation: string;
  status: string;
  voluntario: {
    id: number;
  };
  senior: {
    id: number;
  };
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [userId, setUserId] = useState<number>(1); 
  const [chatUserId, setChatUserId] = useState<number | null>(null);
  const [chatUser, setChatUser] = useState<User | null>(null); 
  const [scheduledUsers, setScheduledUsers] = useState<User[]>([]);

  const fetchMessages = async () => {
    if (chatUserId === null) {
      console.warn("chatUserId não definido.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token de autenticação não encontrado. Por favor, faça login novamente.");
        return;
      }
      const responseMe = await axios.get(`http://localhost:8081/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userId = responseMe.data.id;
      setUserId(userId);

      if (userId === chatUserId) {
        console.warn("O usuário não pode iniciar um chat consigo mesmo.");
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

  const fetchScheduledUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || userId === null) {
        console.warn("Token ou userId não encontrado.");
        return;
      }

      const response = await axios.get(`http://localhost:8081/activities/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      const users = response.data.map((activity: Activity) => ({
        id: activity.id,
        name: activity.title,
        voluntario: activity.voluntario,
        senior: activity.senior,
      }));
      setScheduledUsers(users); 
    } catch (error) {
      console.error("Erro ao buscar usuários agendados:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [chatUserId]);

  useEffect(() => {
    fetchScheduledUsers();
  }, [userId]);

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

  const handleSelectUser = (voluntarioId: number, seniorId: number) => {
    const selectedUserId = voluntarioId === userId ? seniorId : voluntarioId;

    if (selectedUserId === userId) {
      alert("Você não pode iniciar um chat consigo mesmo.");
      return;
    }

    console.log("Usuário selecionado:", selectedUserId); 
    setChatUser(null);
    setMessages([]);
    setChatUserId(selectedUserId);
  };

  return (
    <div className="chat-container">
      <header className="menu-bar">
        <MenuBarUser />
      </header>
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
          <ul>
            {scheduledUsers.map((activity) => (
              <li key={activity.id}>
                <button
                  onClick={() => handleSelectUser(activity.voluntario.id, activity.senior.id)}
                  className="user-button"
                >
                  <span>👤</span>
                  {activity.name}
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