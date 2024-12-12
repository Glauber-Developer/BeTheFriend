import React, { useState } from "react";
import './Login.css'
import imageicon from "/img/bethefriend-icon.png";
import imageleft from "/img/login-image.png";
import { MenuBar } from "../../components/menu-bar/menu-bar";
import { useNavigate } from 'react-router-dom';
import { login } from "../../services/auth/authService";

const Login: React.FC = () => {
  const[error, setError] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
 
  const navigate = useNavigate();

    const goToRegistration = () => {
        navigate('/auth/register');
    };
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try{
        await login(email, password);
        navigate('/homeuser');
      }
      catch{
        setError("credenciais inválidas!");
      }
    }

    return (       
          <div className="login-container">
            <header className="menu-bar">
              <MenuBar></MenuBar>
            </header>
      {/* Lado Esquerdo */}
      <div className="login-left">
        <img 
          src={imageleft} 
          alt="Login Illustration" 
          className="login-image" 
        />
      </div>

      {/* Lado Direito */}
      <div className="login-right">
        <div className="login-box">
          <div className="login-header">
            <h1 className="login-title">
              BeTheFriend
              <img 
                src={imageicon} 
                className="login-title-image" 
              />
            </h1>
          </div>

          <h2 className="login-subtitle">Login</h2>

          {/* Formulário */}
          <div className="login-box-2">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="password"  className="form-label">Senha</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="form-input" />
            </div>
            {error}
            <div className="login-form-button"> 
            <button type="submit" className="login-button">Entrar</button>
            <button type="button" onClick={goToRegistration} className="signup-button">Cadastre-se</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default Login;