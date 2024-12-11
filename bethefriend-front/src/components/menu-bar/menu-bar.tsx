import './menu-bar.css'
import { Button } from "../button/button-menu-entrar";
import { useNavigate } from 'react-router-dom';


export function MenuBar () {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    };
        return(
        <div className="menu-bar">
            <button className="logo" onClick={handleLogoClick} aria-label="Página inicial">BeTheFriend</button>
            <nav className="menu-links">
                <a href="#quem-somos">QUEM SOMOS</a>
                <a href="#comunidade">COMUNIDADE</a>
                <a href="#contato">CONTATO</a>
            </nav>
            <Button></Button>
            </div>    
    )
}