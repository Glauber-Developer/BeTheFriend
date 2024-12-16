import React from "react";
import "./WhoWeAre.css"; 
import image1 from "/img/HomeUser.png";
import image2 from "/img/chat.png";
import image3 from "/img/Help.png";
import hamburguer from "/img/icon-hamburger.png";
import arrow from "/img/seta-botao.png";
import local from "/img/local.png";
import { MenuBar } from "../../components/menu-bar/menu-bar";

const WhoWeAre: React.FC = () => {
  return (
        <div>
          <header className="menu-bar">
                      <MenuBar></MenuBar>
                    </header>
                  {/* ----- ABOUT ----- */}
            <section className="about-section">
          <h2 className="about-title">Quem somos?</h2>
          <hr className="title-line" />
          <div className="about-content">
            <div className="about-left">
              <h3 className="about-subtitle">
                Conectamos amizades de forma eficiente e em qualquer lugar!
              </h3>
            </div>
            <div className="divider"></div>
            <div className="about-right">
              <p className="about-description">
                Com cada interação, criamos histórias de mudança, onde apoio e amizade geram um impacto positivo na vida de todos, criando um futuro mais colaborativo e solidário.
              </p>
            </div>
          </div>
        </section>
        {/* --- 1 --- */}
        <section className="features-section">
          <div className="feature feature-left">
          <div className="features-text">
            <img
              src={hamburguer}            
              alt="Ícone de Menu Hamburger"
              className="feature-icon"
            />
            <h3 className="feature-title">Cadastro Simplificado</h3>
            <p className="feature-description">
              Cadastre-se de forma rápida e fácil, preenchendo apenas as informações essenciais. O processo é intuitivo, para que todos possam começar a usar o aplicativo sem dificuldades.
            </p>
            </div>
          </div>
          <div className="feature feature-right">
            <img src={image1} alt="Imagem representativa" className="feature-image" />
          </div>
        </section>
        {/* --- 2 --- */}
        <section className="features-section">
        <div className="feature feature-left">
            <img src={image2} alt="Imagem representativa" className="feature-image" />
          </div>
          <div className="feature feature-right">
          <div className="features-text">
            <img
              src={arrow}            
              alt="Ícone chat"
              className="feature-icon"
            />
            <h3 className="feature-title">Conexão</h3>
            <p className="feature-description">
            Agora você já pode buscar por usuários com interesses e necessidades semelhantes. O sistema permite filtrar a localização e tipo de apoio, garantindo que as conexões sejam relevantes e significativas.
            </p>
            </div>
          </div>
        </section>
        {/* --- 3 --- */}
        <section className="features-section">
          <div className="feature feature-left">
            <div className="features-text">
            <img
              src={local}            
              alt="Ícone local"
              className="feature-icon local"
            />
            <h3 className="feature-title">Atividades conjuntas</h3>
            <p className="feature-description">
            Agende encontros presenciais ou virtuais pelo aplicativo, com a opção de confirmar a atividade junto à outra pessoa. As interações podem ser de aprendizagem, passeios ou qualquer outra atividade.
            </p>
            </div>
          </div>
          <div className="feature feature-right">
            <img src={image3} alt="Imagem representativa" className="feature-image image3" />
          </div>
        </section>
    </div>
  );
};

export default WhoWeAre;
