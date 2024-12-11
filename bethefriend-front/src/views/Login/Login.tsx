import React from "react";
import './Login.css'
import imageicon from "/img/bethefriend-icon.png";
import imageleft from "/img/login-image.png";
import { MenuBar } from "../../components/menu-bar/menu-bar";
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

    const goToRegistration = () => {
        navigate('/register');
    };
    const goToHomeUser = () => {
      navigate('/homeuser');
  };

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
          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Senha</label>
              <input type="password" id="password" className="form-input" />
            </div>

            <a href="/forgot-password" className="forgot-password">Esqueci minha senha</a>
            <div className="login-form-button"> 
            <button type="submit" onClick={goToHomeUser} className="login-button">Entrar</button>
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