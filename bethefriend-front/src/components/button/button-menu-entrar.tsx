import './button-menu-entrar.css'
import imagebutton from "/img/bola-botao.png";
import { useNavigate } from "react-router-dom";

export function Button () {
        const navigate = useNavigate();

        const goToLogin = () => {
        navigate("/login");
  };
    return(
        <div>
            <button onClick={goToLogin} className="menu-button-entrar">Entrar <img 
                                  src={imagebutton}
                                  className="rosa" 
            /></button>
        </div>
    )

}