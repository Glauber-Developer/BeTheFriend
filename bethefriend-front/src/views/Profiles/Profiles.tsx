import React from "react";
import listavoluntario from "/img/lista-voluntarios.png";
import star from "/img/star.png";
import './Profiles.css'
import MenuBarUser from "../../components/menu-bar/menu-bar-user.tsx";

interface User {
  id: number;
  name: string;
  city: string;
  commonInterests: number;
  activities: number;
}

const users: User[] = [
  { id: 1, name: "Ana Oliveira", city: "São Paulo", commonInterests: 5, activities: 12 },
  { id: 2, name: "João Silva", city: "Rio de Janeiro", commonInterests: 3, activities: 20 },
  { id: 3, name: "Carla Mendes", city: "Curitiba", commonInterests: 7, activities: 15 },
  { id: 4, name: "Ana Oliveira", city: "São Paulo", commonInterests: 5, activities: 12 },
  { id: 5, name: "João Silva", city: "Rio de Janeiro", commonInterests: 3, activities: 20 },
  { id: 6, name: "Carla Mendes", city: "Curitiba", commonInterests: 7, activities: 15 },
  { id: 7, name: "Ana Oliveira", city: "São Paulo", commonInterests: 5, activities: 12 },
  { id: 8, name: "João Silva", city: "Rio de Janeiro", commonInterests: 3, activities: 20 },
  { id: 9, name: "Carla Mendes", city: "Curitiba", commonInterests: 7, activities: 15 },
];


const Profiles: React.FC = () => {
  const handleUserClick = (userId: number) => {
    console.log(`Redirecionando para o perfil do usuário ${userId}`);
  };

    return (
        <div className="total">
          {/* Menu Superior */}
          <header className="menu-bar">
            <MenuBarUser></MenuBarUser>
          </header>
           {/* MAIN CONTENT */}
           <div className="container">
      <div className="image-section">
        <img src={listavoluntario} alt="Background" className="background-image" />
      </div>
      <div className="list-section">
        <div className="user-list">
          {users.map((user) => (
            <div
              className="user-box"
              key={user.id}
              onClick={() => handleUserClick(user.id)}
            >
              <div className="user-icon">👤</div>
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-city">{user.city}</div>
              </div>
              <div className="common-interests">
                <div className="number">5</div>
                <div className="text">
                  <span>Interesses</span>
                  <span>em comum</span>
                </div>
              </div>
              <div className="user-activities">+ {user.activities} </div>
              <img src={star} className="icon-star" />
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

  
export default Profiles;