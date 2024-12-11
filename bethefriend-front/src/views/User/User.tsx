import React, { useState } from "react";
import star from "/img/star.png";
import './User.css'
import MenuBarUser from "../../components/menu-bar/menu-bar-user.tsx";
import imagebutton1 from "/img/bola-botao-branco.png";
import imagebutton2 from "/img/seta-botao.png";
import { useNavigate } from "react-router-dom";


const User: React.FC = () => {
  const navigate = useNavigate();
  const goToScheduleActivity = () => {
    navigate("/scheduleactivity");
  }; 
  const goToChat = () => {
    navigate("/chat");
  }; 
    const [isFriend, setIsFriend] = useState(false); // Estado para controlar se são amigos

  const handleConnectClick = () => {
    setIsFriend((prevIsFriend) => !prevIsFriend); // Alterna entre "Conectar" e "Amigos"
  };
    return (
        <div className="total">
          {/* Menu Superior */}
          <header className="menu-bar">
            <MenuBarUser></MenuBarUser>
          </header>
           {/* MAIN CONTENT */}
           <div className="user-profile-container">
            <div className="division">
      {/* Retângulo principal */}
      <div className="user-box">
        <div className="user-info">
          <div className="user-icon">👤</div>
          <div className="user-details">
            <h1 className="user-name">Usuário 01</h1>
            <p className="user-location">Curitiba</p>
            <p className="user-activities">+2 <img src={star} className="icon-star" /> Atividades Realizadas</p>
          </div>
          <button className="connect-button" onClick={handleConnectClick}>
              {isFriend ? "Amigos" : "+ Conectar"}
            </button>
        </div>

        {/* Interesses em comum */}
        <div className="interests-section">
          <p className="interests-title">4 Interesses em comum</p>
          <div className="interests-list">
            <div className="interest">Tecnologia</div>
            <div className="interest">Bate papo</div>
            <div className="interest">Filmes</div>
            <div className="interest">Jogos / Recreação</div>
          </div>

          {/* Outros interesses */}
          <p className="interests-title">Outros interesses</p>
          <div className="interests-list other-interests">
            <div className="interest">Artesanatos</div>
            <div className="interest">Saúde</div>
            <div className="interest">Culinária</div>
          </div>
        </div>
      </div>

      {/* Botões fora do retângulo */}
      <div className="actions-container">
        <button onClick={goToScheduleActivity} className="schedule-button">Agendar atividade<img src={imagebutton1}  className="button-icon1"/></button>
        <button onClick={goToChat} className="message-button">Enviar mensagem<img src={imagebutton2}  className="button-icon"/></button>
      </div>
    </div>
    </div>
    </div>
  );
};

  
export default User;