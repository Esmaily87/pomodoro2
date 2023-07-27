import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import{ Router } from './Router';


import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";

export function App() {

  
 

  return (// necessário wraper para o elementos das rotas usando browser router
   <ThemeProvider theme = {defaultTheme}>
        <BrowserRouter> 
      
          <Router/>
      
      </BrowserRouter>
   <GlobalStyle/>
   </ThemeProvider>
  )
}


