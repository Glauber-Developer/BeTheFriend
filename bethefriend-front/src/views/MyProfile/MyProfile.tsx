import React, { useState, useEffect } from "react";
import './MyProfile.css';
import { MenuBarUser } from "../../components/menu-bar/menu-bar-user";
import axios from "axios";

interface Activity {
  title: string;
  skills: string[];
  date: string;
  time: string;
  activityType: string;
  locationFormat: string;
  status: string;
  meetingLocation: string;
}


const MyProfile: React.FC = () => {
  // const userId = 0; //ver depois
  const [status, setStatus] = useState<"default" | "scheduled" | "cancelled">("default");

  const handleAccept = () => {
    setStatus("scheduled");
  };

  const handleCancel = () => {
    setStatus("cancelled");
  };

  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    id: 0, 
    name: "",
    email: "",
    password: "",
    city: "",
    state: "",
    country: "",
    skills: [] as string[],
    type: "",
  });

  useEffect(() => {
    const fetchUpdateActivity = async () => {
      try { 
        const token = localStorage.getItem("token");
                
        const response = await axios.put(`http://localhost:8081/activities/${userProfile.id}`, {
          ...activities,
          status: status,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Update: ",response.data);
        setStatus(response.data.status);
        alert("Perfil atualizado com sucesso!");
      }
      catch(error) {
        console.error("Erro ao buscar dados do usuário logado:", error);
      }
    }

    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Token de autenticação não encontrado. Por favor, faça login novamente.");
          return;
        }

        const profileResponse = await axios.get(`http://localhost:8081/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = profileResponse.data;
        setUserProfile(userData);
        setSelectedPreferences(userData.skills);

        console.log(userData);
        const activitiesResponse = await axios.get(`http://localhost:8081/activities/user/${userData.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(activitiesResponse.data);
        setActivities(activitiesResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário logado:", error);
        alert("Não foi possível carregar os dados do usuário. Tente novamente.");
      }
    };
    fetchUpdateActivity();
    fetchUserProfile();
  }, []);

  const togglePreference = (preference: string) => {
    if (!isEditing) return;
    setSelectedPreferences((prev) =>
      prev.includes(preference)
        ? prev.filter((p) => p !== preference)
        : [...prev, preference]
    );
  };

  const preferences = [
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

  
  
  const handleEditToggle = async () => {

    
    if (isEditing) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Token de autenticação não encontrado. Por favor, faça login novamente.");
          return;
        }

        await axios.put(`http://localhost:8081/users/${userProfile.id}`, {
          ...userProfile,
          skills: selectedPreferences,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Perfil atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        alert("Ocorreu um erro ao atualizar o perfil. Tente novamente.");
      }
    }
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setUserProfile({ ...userProfile, [field]: event.target.value });
  };

  return (
    <div className="all">
      <header className="menu-bar">
        <MenuBarUser></MenuBarUser>
      </header>
      <div className="profile-container">
        <div className="profile-left">
          <div className="profile-box">
            <div className="profile-header">
              <span className="profile-icon">👤</span>
            </div>

            <div className="profile-info">
              {isEditing ? (
                <>
                  <label className="profile-label">Nome:</label>
                  <input
                    className="input-edit"
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => handleInputChange(e, "name")}
                  />

                  <label className="profile-label">Email:</label>
                  <input
                    className="input-edit"
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => handleInputChange(e, "email")}
                  />

                  <label className="profile-label">Senha:</label>
                  <input
                    className="input-edit"
                    type="password"
                    value={userProfile.password}
                    onChange={(e) => handleInputChange(e, "password")}
                  />

                  <label className="profile-label">Cidade:</label>
                  <input
                    className="input-edit"
                    type="text"
                    value={userProfile.city}
                    onChange={(e) => handleInputChange(e, "city")}
                  />

                  <label className="profile-label">Estado:</label>
                  <input
                    className="input-edit"
                    type="text"
                    value={userProfile.state}
                    onChange={(e) => handleInputChange(e, "state")}
                  />

                  <label className="profile-label">País:</label>
                  <input
                    className="input-edit"
                    type="text"
                    value={userProfile.country}
                    onChange={(e) => handleInputChange(e, "country")}
                  />
                </>
              ) : (
                <>
                  <div className="label-identifier">{userProfile.type}</div>

                  <label className="profile-label">Nome:</label>
                  <p>{userProfile.name}</p>

                  <label className="profile-label">Email:</label>
                  <p>{userProfile.email}</p>

                  <label className="profile-label">Cidade:</label>
                  <p>{userProfile.city}</p>

                  <label className="profile-label">Estado:</label>
                  <p>{userProfile.state}</p>

                  <label className="profile-label">País:</label>
                  <p>{userProfile.country}</p>
                </>
              )}
            </div>

            <div className="preferences">
              <h3>Personalizar Perfil</h3>
              <div className="preferences-grid">
                {preferences.map((pref) => (
                  <button
                    key={pref}
                    className={`preference-button ${
                      selectedPreferences.includes(pref) ? "selected" : ""
                    }`}
                    onClick={() => togglePreference(pref)}
                    disabled={!isEditing} 
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleEditToggle} className="edit-profile-button">
              {isEditing ? "Salvar" : "Editar Perfil"}
            </button>
          </div>
        </div>

        <div className="profile-right">
          <div className="activities-box3">
            <h3>Atividades Agendadas</h3>
            {activities.map((activity, index) => (
              <div key={index} className="activity-box3">
                <p><strong>Título:</strong> {activity.title}</p>
                <p><strong>Habilidades:</strong> {activity.activityType ? activity.activityType : "Nenhuma habilidade disponível"}</p>
                <p><strong>Data:</strong> {activity.date}</p>
                <p><strong>Horário:</strong> {activity.time}</p>
                <p><strong>Endereço:</strong> {activity.locationFormat}</p>
                <p><strong>{
                  activity.meetingLocation === "Presencial" ? "Local:" : "Link:"
                }</strong> {activity.meetingLocation}</p>

                <div className="activity-cont3">
                      {status === "default" && userProfile.type === "VOLUNTARIO" && (
                        <>
                          <button className="accept-button" onClick={handleAccept}>
                          ✓ Aceitar Atividade
                          </button>
                          <button className="cancel-button" onClick={handleCancel}>
                            Desmarcar Atividade
                          </button>
                        </>
                      )}

                      {status === "default" && userProfile.type === "SENIOR" && (
                        <button className="waiting-button">Aguardando agendamento</button>
                      )}

                      {status === "scheduled" && (
                        <>
                          <button className="scheduled">✓  Atividade agendada</button>
                          <button className="cancel-button" onClick={handleCancel}>
                            Desmarcar Atividade
                          </button>
                        </>
                      )}

                      {status === "cancelled" && (
                        <button className="cancelled-button">Atividade desmarcada</button>
                      )}
                    </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
