import React, { useState, useEffect } from "react";
import './ScheduleActivities.css';
import { MenuBarUser } from "../../components/menu-bar/menu-bar-user";
import { useNavigate, useParams } from "react-router-dom";
import imagebutton2 from "/img/bola-botao-branco.png";
import axios from "axios";

const ScheduleActivities: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const goToMyProfile = () => {
    navigate("/myprofile");
  };

  const [title, setTitle] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [meetingType, setMeetingType] = useState<string>("Presencial");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [seniorId, setSeniorId] = useState<number | null>(null);

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

  useEffect(() => {
    console.log("User ID from URL:", userId);
    fetchSeniorId();
  }, [userId]);

  const fetchSeniorId = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token de autenticação não encontrado. Por favor, faça login novamente.");
        return;
      }

      const response = await axios.get(`http://localhost:8081/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSeniorId(response.data.id);
    } catch (error) {
      console.error("Erro ao buscar ID do sênior:", error);
      alert("Ocorreu um erro ao buscar o ID do sênior. Tente novamente.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !selectedOption || !date || !time || !location || !seniorId) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    const activityData = {
      title: title,
      activityType: selectedOption, 
      date: date,
      time: time,
      locationFormat: location,
      meetingLocation: meetingType,
      status: "Pendente",
      senior: { id: seniorId }, 
      voluntario: { id: parseInt(userId || "0") }, 
    };
    console.log("Activity Data:", activityData);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token de autenticação não encontrado. Por favor, faça login novamente.");
        return;
      }

      const response = await axios.post("http://localhost:8081/activities", activityData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Atividade agendada com sucesso!");
      console.log("Response Data:", response.data);
      goToMyProfile();
    } catch (error) {
      console.error("Erro ao agendar atividade:", error);
      alert("Ocorreu um erro ao agendar a atividade. Tente novamente.");
    }
  };

  return (
    <div>
      <header className="menu-bar">
        <MenuBarUser></MenuBarUser>
      </header>
      <form onSubmit={handleSubmit}>
      <div className="scheduleContainer">
        <div className="schedule-box">
          <div className="schedulehero">
            <span className="icon">👤</span>
            <div className="schedulehero-text">
              <h2>Agende atividade com</h2>
              <h3>Nome do Usuário</h3>
            </div>
          </div>

          <label className="label">Título da Atividade</label>
          <input
            className="input"
            type="text"
            placeholder="Escreva sua atividade aqui"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="label">Selecione atividade desejada</label>
          <div className="activity-options">
            {activityOptions.map((option) => (
              <button
                key={option}
                type="button"
                value={option}
                className={`activity-button ${
                  selectedOption === option ? "selected" : ""
                }`}
                onClick={() => {setSelectedOption(option);
                console.log("Selected option:", option)
                }}
              >
                {option}
                
              </button>
            ))}
          </div>

          <div className="additional-info">
            <div className="rowschedule">
              <div className="inputschedule">
                <label>Data</label>
                <input
                  className="input-data"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="inputschedule">
                <label>Horário de Início</label>
                <input
                  className="input"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
               </div> 
            </div>
              <div className="rowschedule">
                <div className="inputschedule">
                  <label>Local</label>
                    <select
                      className="input-local"
                      value={meetingType}
                      onChange={(e) => setMeetingType(e.target.value)}
                    >
                      <option value="Presencial">Presencial</option>
                      <option value="Virtual">Virtual</option>
                    </select>
                </div>
                <div className="inputschedule">
                  <label>
                    {meetingType === "Virtual" ? "Link do Encontro" : "Local de Encontro"}
                  </label>
                  <input
                    className="input"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
          </div>
        </div>

        <button type="submit" className="finalize-button">
          Finalizar Agendamento <img src={imagebutton2} className="finalize" />
        </button>
      </div>
      </form>
    </div>
  );
};

export default ScheduleActivities;