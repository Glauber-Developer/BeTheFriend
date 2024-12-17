import React, { useEffect, useState } from "react";
import star from "/img/star.png";
import './Profiles.css';
import MenuBarUser from "../../components/menu-bar/menu-bar-user.tsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  type: string;
  city: string;
  state: string;
  country: string;
  skills: string[];
}



const Profiles: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [filterType, setFilterType] = useState<"SENIOR" | "VOLUNTARIO">("SENIOR");
  const [filters, setFilters] = useState({
    city: "",
    state: "",
    country: "",
    skills: "",
  });

  const handleUserClick = (userId: number) => {
    navigate(`/scheduleactivity/${userId}`);
  };

  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8081/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar os usuários:", error);
    }
  };

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      // Remove campos vazios dos filtros
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value)
      );

      const seniorsResponse = await axios.get("http://localhost:8081/users/seniors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: activeFilters,
      });

      const volunteersResponse = await axios.get("http://localhost:8081/users/volunteers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: activeFilters,
      });

      if (Array.isArray(seniorsResponse.data) && Array.isArray(volunteersResponse.data)) {
        const allUsers = [...seniorsResponse.data, ...volunteersResponse.data];
        const filteredUsers = allUsers.filter((user) => {
          if (filterType === "SENIOR") {
            return user.type === "VOLUNTARIO";
          } else {
            return user.type === "SENIOR";
          }
        });
        setUsers(filteredUsers);
      } else {
        console.error("A resposta da API não é um array:", seniorsResponse.data, volunteersResponse.data);
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value.toUpperCase(),
    }));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.length <= 2) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value.toUpperCase(),
      }));
    }
  };

  useEffect(() => {
    getAllUsers();
    getUsers();
  }, [filterType]);

  return (
    <div className="prof">
      {/* Menu */}
      <header className="menu-bar">
        <MenuBarUser />
      </header>
      {/* Filters */}
      <div className="filters-section">
        <h2>Filtros</h2>
          <select
            name="type"
            onChange={(e) => setFilterType(e.target.value as "SENIOR" | "VOLUNTARIO")}
            value={filterType}
          >
            <option value="SENIOR">Idosos</option>
            <option value="VOLUNTARIO">Voluntários</option>
          </select>
          <input
            type="text"
            name="city"
            placeholder="Cidade"
            value={filters.city}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="state"
            placeholder="Estado"
            value={filters.state}
            onChange={handleInput}
          />
          <input
            type="text"
            name="country"
            placeholder="País"
            value={filters.country}
            onChange={handleInput}
          />
          {filterType === "VOLUNTARIO" && (
            <select
              name="skills"
              value={filters.skills}
              onChange={handleFilterChange}
            >
              <option value="">Selecione uma habilidade</option>
              {[
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
              ].map((skill) => (
                <option key={skill} value={skill.toUpperCase()}>
                  {skill}
                </option>
              ))}
            </select>
          )}
        <button onClick={getUsers} className="search">Buscar</button>
      </div>
          
          {/* Users List */}
      <div className="list-section">
          <div className="user-list">
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  className="user-box"
                  key={user.id}
                  onClick={() => handleUserClick(user.id)}
                >
                  <div className="user-icon">👤</div>
                  <div className="user-info">
                    <div className="user-name">{user.name}</div>
                    <div className="user-location">{user.city}, {user.state}</div>
                  </div>
                  <div className="user-skills">{user.skills.join(", ")} Interesses em comum</div>
                  <div className="skills-count">
                    <span>{user.skills.length} Atividades realizadas</span>
                    <img src={star} className="icon-star" />
                    
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhum usuário encontrado.</p>
            )}
          </div>
        </div>
      </div>
  );
};

export default Profiles;