import React, { useState } from "react";
import "./Registration.css";
import imageicon from "/img/bethefriend-icon.png";
import { MenuBar } from "../../components/menu-bar/menu-bar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("") 
  const [selectedPerfil, setSelectedPerfil] = useState<string[]>([]);
  const [perfil, setPerfil] = useState<string>("");

  const togglePerfilSelection = (item: string) => {
    setSelectedPerfil((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Implementar a função de cadastro
    const response = await axios.post("http://localhost:8081/auth/register", {
      name: name,
      email: email,
      password: password,
      city: city,
      country: country,
      state: state,
      skills: "selectedPerfil",
      typeUser: "SENIOR",
    });

    navigate("/auth/login");
    console.log(response.data);
  };

  return (            
    <div className="container">
        <header className="menu-bar">
              <MenuBar></MenuBar>
        </header>
    <form onSubmit={handleSubmit}>
    <div className="container-box center-wrapper">
      {/* Caixa da Esquerda */}
      <div className="box-left">
        <h1>Cadastro</h1>
        <div className="form-box">
        
            {/* - Linha 1: Nome e Sobrenome - */}
            <div className="row">
                <div className="input-group">
                <label>Nome</label>
                <input 
                  type="text" 
                  placeholder="Nome" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  required
                  />
                </div>
                <div className="input-group">
                <label>Sobrenome</label>
                <input
                  type="text"
                  placeholder="Sobrenome"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required  
                  />
                </div>
            </div>

            {/* - Linha 2: E-mail - */}
            <div className="row">
                <div className="input-group">
                <label>E-mail</label>
                <input 
                  type="email" 
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required  
                  />
                </div>
            </div>

            {/* - Linha 3: Senha e Confirmação de Senha - */}
            <div className="row">
                <div className="input-group">
                <label>Senha</label>
                <input 
                type="password" 
                placeholder="Senha"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required
                 />
                </div>
                <div className="input-group">
                <label>Confirmação de senha</label>
                <input 
                type="password" 
                placeholder="Confirmação de senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                />
                </div>
            </div>
            
        </div>
        <div className="form-box-3">
                    {/* - Linha 4: País, Cidade e Estado -*/}
            <div className="row">
            <div className="input-group full-width">
                <label>País</label>
                <input
                  type="text"
                  placeholder="País"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  />
            </div>
            </div>
            <div className="row">
            <div className="input-group">
                <label>Cidade</label>
                <input
                   type="text"
                   placeholder="Cidade"
                   value={city}
                   onChange={(e) => setCity(e.target.value)}
                   required
                   />
            </div>
            <div className="input-group">
                <label>Estado</label>
                <input
                  type="text"
                  placeholder="Estado"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required 
                   />
            </div>
            </div>
        </div>
      </div>

      {/* Caixa da Direita */}
      <div className="box-right">
      <div className="icon">
          <img src={imageicon}  className="icon-registration" />
        </div>
        <div className="form-box">
          <h2>Quem é você?</h2>
          <div className="button-group">
            <button
              className={`option ${perfil === "Jovem voluntário" ? "selected" : ""}`}
              onClick={() => setPerfil("Jovem voluntário")}
              >
              <span className={`circle ${perfil === "Jovem voluntário" ? "active" : ""}`} />
              Jovem voluntário
            </button>
            <button
                className={`option ${
                    perfil === "Pessoa em busca de conexão e apoio" ? "selected" : ""
                }`}
                onClick={() => setPerfil("Pessoa em busca de conexão e apoio")}
                >
                <span
                    className={`circle ${
                    perfil === "Pessoa em busca de conexão e apoio" ? "active" : ""
                    }`}
                />
                Pessoa em busca de conexão e apoio
            </button>
          </div>
        </div>
        <div className="form-box-2">
          <h2>Personalize seu perfil</h2>
          <div className="profile-options">
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
            ].map((item) => (
              <button
                value = {selectedPerfil}
                key={item}
                className={`selectable ${
                  selectedPerfil.includes(item) ? "selected" : ""
                }`}
                onClick={() => togglePerfilSelection(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <button type="submit" className="finalize-btn">Finalizar</button>
      </div>
    </div>
    </form>
    </div>
  );
};

export default Register;
