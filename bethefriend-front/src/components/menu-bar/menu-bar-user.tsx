import './menu-bar-user.css'
import imagebutton from "/img/bola-botao-roxo.png";
import imagebutton2 from "/img/seta-botao.png";
import { useNavigate } from 'react-router-dom';


export function MenuBarUser () {
    const navigate = useNavigate();

    const goToHomeUser = () => {
        navigate('/homeuser');
    };
    const goToScheduleActivity = () => {
        navigate('/scheduleactivity');
    };
    const goToChat = () => {
        navigate('/chat');
    };
    const goToProfiles = () => {
        navigate('/profiles');
    };
    const goToMyActivities = () => {
        navigate('/myactivities');
    };
        return(
        <div className="menu-bar">
            <button className="logo" onClick={goToHomeUser} aria-label="Página inicial">BeTheFriend</button>
            <nav className="menu-links">
                <a onClick={goToHomeUser}>
                    <div className="quem-somos">
                        <div className="text">
                            <span>QUEM</span>
                            <span>SOMOS</span>
                        </div>
                    </div>
                </a>
                <a onClick={goToHomeUser}>COMUNIDADE</a>
                <a onClick={goToHomeUser}>CONTATO</a>
                <a onClick={goToMyActivities}>
                <div className="minhas-atividades">
                        <div className="text">
                            <span>MINHAS</span>
                            <span>ATIVIDADES</span>
                        </div>
                    </div>
                </a>
                <a onClick={goToScheduleActivity}>
                <div className="agendar-atividades">
                        <div className="text">
                            <span>AGENDAR</span>
                            <span>ATIVIDADES</span>
                        </div>
                    </div>
                </a>
            </nav>
            <div className="buttons">
                <button onClick={goToChat} className="menu-button-chat">Chat<img src={imagebutton2}
                                                  className="button-icon2" 
                /></button>
                <button onClick={goToProfiles} className="menu-button-perfis">Perfis<img 
                                                  src={imagebutton}
                                                  className="seta" 
                /></button>
              </div>
            </div>    

            
    )
}
export default MenuBarUser;