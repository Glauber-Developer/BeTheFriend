import React from "react";
import logoimage from "/img/Logotipo.png";
import imagebutton from "/img/bola-botao.png";
import './Home.css'
import { MenuBar } from "../../components/menu-bar/menu-bar";
import { useNavigate } from "react-router-dom";

const HomeView: React.FC = () => {
   const navigate = useNavigate();
    const goToLogin = () => {
    navigate("/auth/login");
  };
  const goToRegistration = () => {
    navigate('/auth/register');
  };
    return (
        <div>
          {/* Navbar */}
            <div>
              <MenuBar></MenuBar>
            </div>
          {/* HERO SECTION */}
            <main className="hero">
              <div className="hero-content">
                {/* LEFT */}
                <div className="hero-left">
                  <h1 className="title">
                    Be <br />
                    The <br />
                    Friend
                  </h1>
                  <p className="subtitle">
                    Nosso propósito é conectar jovens e idosos para compartilhar
                    experiências, aprender juntos e criar memórias.
                  </p>
                  <div className="buttons">
                    <button onClick={goToLogin} className="main-button-entrar">Entrar</button>
                    <button onClick={goToRegistration} className="main-button-cadastrar">Cadastre-se<img 
                                                      src={imagebutton}
                                                      className="rosa2"/></button>
                  </div>
                </div>
                {/* RIGHT */}
                  <div className="hero-right">
                    <img src={logoimage} alt="Conexão entre gerações" className="heroimage"/>
                  </div>
                </div>
                <div className="wave-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,256L40,240C80,224,160,192,240,197.3C320,203,400,245,480,261.3C560,277,640,267,720,245.3C800,224,880,192,960,197.3C1040,203,1120,245,1200,250.7C1280,256,1360,224,1400,208L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
                </div>
          </main>
 
        </div> 
      );
    };
  
export default HomeView;