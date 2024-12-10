import './button-menu-entrar.css'
import imagebutton from "/img/bola-botao.png";

export function Button () {
    return(
        <div>
            <button className="menu-button-entrar">Entrar <img 
                                  src={imagebutton}
                                  className="button-icon" 
            /></button>
        </div>
    )

}