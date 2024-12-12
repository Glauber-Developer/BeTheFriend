import React, { useState } from "react";
import './ScheduleActivities.css'
import { MenuBarUser } from "../../components/menu-bar/menu-bar-user";
import { useNavigate } from "react-router-dom";
import imagebutton2 from "/img/bola-botao-branco.png";

const ScheduleActivities: React.FC = () => {
  const navigate = useNavigate();
  const goToMyProfile = () => {
    navigate("/myprofile");
  }; 
  
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [meetingType, setMeetingType] = useState<string>("Presencial");

  const activityOptions = [
    "Tecnologia",
    "Jogos",
    "Esporte",
    "Passeio",
    "Bate-papo",
    "Futebol",
    "Leitura",
    "Filmes",
    "Novelas",
    "Jardinagem",
    "Artesanatos",
    "Culinária",
  ];

  return (
    <div>
      <header className="menu-bar">
              <MenuBarUser></MenuBarUser>
        </header>
    
    <div className="schedule-container">
      <div className="schedule-box">
        <div className="header">
          <span className="icon">👤</span>
          <div className="header-text">
            <h2>Agende atividade com</h2>
            <h3>Nome do Usuário</h3>
          </div>
        </div>

        <label className="label">Título da Atividade</label>
        <input
          className="input"
          type="text"
          placeholder="Escreva sua atividade aqui"
        />
          <label className="label">Selecione atividade desejada</label>
        <div className="activity-options">
          
          {activityOptions.map((option) => (
            <button
              key={option}
              className={`activity-button ${
                selectedOption === option ? "selected" : ""
              }`}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="additional-info">
          <label>Data</label>
          <input className="input" type="date" />

          <label>Horário de Início</label>
          <input className="input" type="time" />

          <label>Local</label>
          <select
            className="input-local"
            value={meetingType}
            onChange={(e) => setMeetingType(e.target.value)}
          >
            <option value="Presencial">Presencial</option>
            <option value="Virtual">Virtual</option>
          </select>

          <label>
            {meetingType === "Virtual" ? "Link do Encontro" : "Local de Encontro"}
          </label>
          <input className="input" type="text" />
        </div>
      </div>

      <button onClick={goToMyProfile} className="finalize-button">Finalizar Agendamento <img src={imagebutton2}  className="finalize"/></button>
    </div>
    </div>
  );
};

export default ScheduleActivities;