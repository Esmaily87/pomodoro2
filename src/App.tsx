import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import{ Router } from './Router';
import { defaultTheme, lightTheme } from "./styles/themes/default";//o tema da global da aplicacao
import { GlobalStyle } from "./styles/global"
import React from "react"



export function App() {

    const[selectedTheme, setSelectedTheme] = React.useState("dark"); //estado que monitora a alteracao do setSelectedTheme

    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {//funcao que captura a mudanca de evento
    const newTheme = event.target.value; // pega o valor do value do theme vindo do select
    setSelectedTheme(newTheme); //seta o valor selecionado na variável declarada anteriormente
  };
 

 
    // function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
      
    //   e.preventDefault();
     
    //   const form = e.currentTarget;
    //   const formData = new FormData(form);
      
    //    const selectedTheme = formData.get("selectedTheme") as string;
    //    setSelectedTheme(selectedTheme)
       
       
    //   console.log("Selected Theme: ", selectedTheme); 
      

      
      

    // }



  return (// necessário wraper para o elementos das rotas usando browser router
  <ThemeProvider theme = {selectedTheme =="dark" ? defaultTheme : lightTheme}> {/*operadoor ternario que seta dark como default e recebe a alteracao do tema*/}
        <BrowserRouter> 
      
     
        
        <select name="selectedTheme" value={selectedTheme} onChange={handleThemeChange}>
          <option value="dark">Dark Theme</option>
          <option value="light">Light Theme</option>
        </select>
    
     
       

          <Router/>
         
      
      </BrowserRouter>
      
   <GlobalStyle/>
   </ThemeProvider>
  )
}


