import React, { useEffect, useState } from "react";
import './Chat.css'
import MenuBarUser from "../../components/menu-bar/menu-bar-user.tsx";
import Imagechat from "/img/chat.png";


interface Message {
  id: number;
  sender: string;
  content: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'Arthur Fontana', content: 'Olá, tudo bem? Quando você está disponível para marcarmos um jogo de xadrez?'} // Mensagem prévia
  ]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    // Simula uma requisição GET para obter mensagens
    const fetchMessages = async () => {
      // Substituir por sua API real
      const response = await fetch('/api/messages'); 
      const data = await response.json();
      setMessages(data);
    };

    fetchMessages();
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMessageObj: Message = {
        id: Date.now(),
        sender: 'Você',
        content: newMessage,
      };

      setMessages([...messages, newMessageObj]);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
          {/* Menu Superior */}
            <header className="menu-bar">
                <MenuBarUser></MenuBarUser>
              </header>
      {/* LEFT */}
      <div className="left-section">
      <div className="chat-box">
        <div className="chat-header">
          <span className="chat-icon">👤</span>
          <div>
            <h2 className="chat-title">Bate-papo com</h2>
            <p className="chat-user-name">Arthur Fontana</p>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-message ${message.sender === 'Você' ? 'sent' : 'received'}`}
            >
              <label className="message-label">{message.sender}</label>
              <div className="message-content">{message.content}</div>
            </div>
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
        {/* RIGHT */}
        <div className="right-section">
            <img
              src={Imagechat}
              alt="Conexão entre gerações"
              className="image"
            />
        </div>
    </div>
  );
};

export default Chat;
