import React, { createContext, useState, PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { defaultTheme, lightTheme } from "../styles/themes/default";

interface ThemeContextProps {
    handleThemeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
    selectedTheme: string

}

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps) //cria um contexto e associa a variável ThemeContextProps com interface de mesmo nome

type ThemeContextProviderProps = PropsWithChildren

export function ThemeContextProvider({ children } : ThemeContextProviderProps) {
    //Estado que monitora a alteraçao do selectedTheme
    const[selectedTheme, setSelectedTheme] = useState('dark');


    //Funcao
    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {//funcao que captura a mudanca de evento
    const newTheme = event.target.value; // pega o valor do value do theme vindo do select
    

    //Set
    setSelectedTheme(newTheme); //seta o valor selecionado na variável declarada anteriormente

};

return(

    <ThemeContext.Provider value={{selectedTheme, handleThemeChange}}>
        <ThemeProvider theme = {selectedTheme == 'dark' ? defaultTheme : lightTheme}>
            {children}
        </ThemeProvider>
    </ThemeContext.Provider>

)

}

// criar um context para um tema 