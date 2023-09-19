import { HeaderContainer, SelectTheme } from "./styles";
import logoIgnite from '../../assets/Logo.svg'
import { Timer, Scroll } from "phosphor-react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext"; // importa a ThemeContext



export function Header() {
    const { handleThemeChange, selectedTheme } = useContext(ThemeContext) 
    return (

        <HeaderContainer>

           
       

        <img src={logoIgnite} alt=""/>
            <nav>
            <SelectTheme name="selectedTheme" value={selectedTheme} onChange = {handleThemeChange}>
                <option value="dark">Dark Theme</option>
                <option value="light">Light Theme</option>
            </SelectTheme>   
            
                <NavLink to="/" title="Timer">
                    <Timer size={24}/>
                </NavLink>

                <NavLink to="/history" title="Histórico">
                    <Scroll size={24} />
                </NavLink>
            </nav>

        </HeaderContainer>
    )
}