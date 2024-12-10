import React from "react";
import logoimage from "/img/Logotipo.png";
import imagebutton from "/img/bola-botao.png";
import './Home.css'
import { Button } from "../components/button/button-menu-entrar";

const HomeView: React.FC = () => {
    return (
        <div className="home-container">
          {/* Menu Superior */}
          <header className="menu-bar">
            <div className="logo">BeTheFriend</div>
            <nav className="menu-links">
              <a href="#quem-somos">QUEM SOMOS</a>
              <a href="#comunidade">COMUNIDADE</a>
              <a href="#contato">CONTATO</a>
            </nav>
            <Button></Button>
          </header>
           {/* MAIN CONTENT */}
          <main className="main-content">
            {/* LEFT */}
            <div className="left-section">
              <h1 className="title">
                Be <br />
                The <br />
                Friend
              </h1>
              <p className="description">
                Nosso propósito é conectar jovens e idosos para compartilhar
                experiências, aprender juntos e criar memórias.
              </p>
              <div className="buttons">
                <button className="main-button-entrar">Entrar</button>
                <button className="main-button-cadastrar">Cadastre-se<img 
                                                  src={imagebutton}
                                                  className="button-icon" 
                /></button>
              </div>
            </div>
            {/* RIGHT */}
            <div className="right-section">
              <img
                src={logoimage}
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
  
export default HomeView;