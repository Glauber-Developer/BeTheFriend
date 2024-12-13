import React, { useState } from "react";
import './MyProfile.css'
import { MenuBarUser } from "../../components/menu-bar/menu-bar-user";


const MyProfile: React.FC = () => {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([
    "Tecnologia",
    "Jogos",
    "Esporte",
    "Passeio",
    "Culinária",
  ]);
  const activities = [
    {
      title: "Caminhada no parque",
      category: "Esporte",
      date: "2024-12-12",
      time: "09:00",
      locationType: "Presencial",
      addressOrLink: "Parque Central, Cidade XYZ",
    },
    {
      title: "Workshop de culinária",
      category: "Culinária",
      date: "2024-12-15",
      time: "14:00",
      locationType: "Virtual",
      addressOrLink: "https://culinaria-online.com",
    },
    
  ]

  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    firstName: "Arthur",
    lastName: "Fontana",
    email: "arthur.fontana@example.com",
    city: "São Paulo",
    state: "São Paulo",
    userType: "Voluntário",
  });

  const togglePreference = (preference: string) => {
    if (!isEditing) return; // Desabilita alteração se não estiver em modo de edição
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

  const handleEditToggle = () => {
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
    {/* Menu Superior */}
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
                  value={userProfile.firstName}
                  onChange={(e) => handleInputChange(e, "firstName")}
                />

                <label className="profile-label">Sobrenome:</label>
                <input
                  className="input-edit"
                  type="text"
                  value={userProfile.lastName}
                  onChange={(e) => handleInputChange(e, "lastName")}
                />

                <label className="profile-label">Email:</label>
                <input
                  className="input-edit"
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => handleInputChange(e, "email")}
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
              </>
            ) : (
              <>
                <div className="label-identifier">{userProfile.userType}</div>

                <label className="profile-label">Nome:</label>
                <p>{userProfile.firstName}</p>

                <label className="profile-label">Sobrenome:</label>
                <p>{userProfile.lastName}</p>

                <label className="profile-label">Email:</label>
                <p>{userProfile.email}</p>

                <label className="profile-label">Cidade:</label>
                <p>{userProfile.city}</p>

                <label className="profile-label">Estado:</label>
                <p>{userProfile.state}</p>

                
                
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
                  disabled={!isEditing} // Desabilita botão se não estiver editando
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
        <div className="activities-box">
          <h3>Atividades Agendadas</h3>
          {activities.map((activity, index) => (
            <div key={index} className="activity-box">
              <p><strong>Título:</strong> {activity.title}</p>
              <p><strong>Categoria:</strong> {activity.category}</p>
              <p><strong>Data:</strong> {activity.date}</p>
              <p><strong>Horário:</strong> {activity.time}</p>
              <p><strong>Local:</strong> {activity.locationType}</p>
              <p><strong>{
                activity.locationType === "Presencial" ? "Endereço:" : "Link:"
              }</strong> {activity.addressOrLink}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default MyProfile;