import React from "react";
import homeuser from "/img/HomeUser.png";
import imagebutton from "/img/bola-botao-roxo.png";
import imagebutton2 from "/img/seta-botao.png";
import './HomeUser.css'
import MenuBarUser from "../../components/menu-bar/menu-bar-user.tsx";
import { useNavigate } from "react-router-dom";

const HomeUser: React.FC = () => {
   const navigate = useNavigate();
    const goToProfiles = () => {
    navigate("/profiles");
  };
  const goToChat = () => {
    navigate('/chat');
  };
    return (
        <div className="home-container">
          {/* Menu Superior */}
          <header className="menu-bar">
            <MenuBarUser></MenuBarUser>
          </header>
           {/* MAIN CONTENT */}
          <main className="main-content">
            {/* LEFT */}
            <div className="left-section">
              <h1 className="title">
                Seja <br />
                Bem-vindo ao <br />
                BeTheFriend
              </h1>
              <p className="description">
              Você está a um clique de fortalecer sua rede de apoio. Explore sua comunidade, faça novas amizades e aproveite ao máximo a vida!
              </p>
              <div className="buttons">
                <button onClick={goToChat} className="main-button-chat">Chat<img src={imagebutton2}
                                                  className="button-icon2" 
                /></button>
                <button onClick={goToProfiles} className="main-button-perfis">Perfis<img 
                                                  src={imagebutton}
                                                  className="roxo" 
                /></button>
              </div>
            </div>
            {/* RIGHT */}
            <div className="right-section">
              <img
                src={homeuser}
                alt="Conexão entre gerações"
                className="image"
              />
            </div>
            
          </main>
          <div className="wave-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,256L40,240C80,224,160,192,240,197.3C320,203,400,245,480,261.3C560,277,640,267,720,245.3C800,224,880,192,960,197.3C1040,203,1120,245,1200,250.7C1280,256,1360,224,1400,208L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
          </div>
        </div>
      );
    };
  
export default HomeUser;