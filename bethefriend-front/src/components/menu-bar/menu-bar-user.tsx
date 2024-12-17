import { logout } from '../../services/auth/authService';
import './menu-bar-user.css'
import imagebutton from "/img/bola-botao-roxo.png";
import imagebutton2 from "/img/seta-botao.png";
import imagelogout from "/img/sair.png";
import { useNavigate } from 'react-router-dom';


export function MenuBarUser () {
    const handleLogout = () => {
        logout();
        console.log("User logged out successfully!");
        navigate('/auth/login');
    };
    const navigate = useNavigate();

    const goToHomeUser = () => {
        navigate('/homeuser');
    };
    const goToWhoWeAre = () => {
        navigate('/whoweare');
    };
    const goToChat = () => {
        navigate('/chat');
    };
    const goToProfiles = () => {
        navigate('/profiles');
    };
    const goToMyProfile = () => {
        navigate('/myprofile');
    };
        return(
        <div className="menu-bar">
            <button className="logo" onClick={goToHomeUser} aria-label="Página inicial">BeTheFriend</button>
            <nav className="menu-links">
                <a onClick={goToWhoWeAre}>
                    <div className="quem-somos">
                        <div className="text">
                            QUEM SOMOS
                        </div>
                    </div>
                </a>
                <a onClick={goToMyProfile}>
                <div className="minhas-atividades">
                        <div className="text">
                            MEU PERFIL
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
              <a onClick={handleLogout}>
                <div className="logout">
                        <div className="text">
                        <img src={imagelogout} className="arrow-logout"/>
                            SAIR
                        </div>
                    </div>
                </a>
            </div>          
    )
}
export default MenuBarUser;