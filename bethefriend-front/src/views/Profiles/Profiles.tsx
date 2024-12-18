import React, { useEffect, useState } from "react";
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
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
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
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar os usuários:", error);
    }
  };

  const filterUsers = () => {
    const filtered = users.filter((user) => {
      const matchesType = user.type === filterType;
      const matchesCity = filters.city ? user.city.toLowerCase().includes(filters.city.toLowerCase()) : true;
      const matchesState = filters.state ? user.state.toLowerCase().includes(filters.state.toLowerCase()) : true;
      const matchesSkills = filters.skills ? user.skills.includes(filters.skills) : true;
      return matchesType && matchesCity && matchesState && matchesSkills;
    });
    setFilteredUsers(filtered);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.length <= 2) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [filterType, filters]);

  return (
    <div className="prof">
      <header className="menu-bar">
        <MenuBarUser />
      </header>
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
            onChange={handleFilterChange}
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
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          )}
      </div>
          
      <div className="list-section">
          <div className="user-list">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
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
                  <div className="user-skills">Interesses: {user.skills.join(", ")}</div>
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