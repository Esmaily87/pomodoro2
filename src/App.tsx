import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import{ Router } from './Router';
import { defaultTheme, lightTheme } from "./styles/themes/default";//o tema da global da aplicacao
import { GlobalStyle } from "./styles/global"
import React from "react"


export function App() {

    const[selectedTheme, setSelectedTheme] = React.useState("dark");

    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = event.target.value;
    setSelectedTheme(newTheme);
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
  <ThemeProvider theme = {selectedTheme =="dark" ? defaultTheme : lightTheme}>
        <BrowserRouter> 
      
     
        <label>
        Escolha um tema:
        <select name="selectedTheme" value={selectedTheme} onChange={handleThemeChange}>
          <option value="-" >-</option>
          <option value="dark">Dark Theme</option>
          <option value="light">Light Theme</option>
        </select>
      </label>
     
       

          <Router/>
         
      
      </BrowserRouter>
      
   <GlobalStyle/>
   </ThemeProvider>
  )
}


