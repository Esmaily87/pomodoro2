//import { ThemeProvider } from "styled-components";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { BrowserRouter } from "react-router-dom";
import{ Router } from './Router';
//import { defaultTheme, lightTheme } from "./styles/themes/default";//o tema da global da aplicacao
import { GlobalStyle } from "./styles/global"
import { CycleContextProvider} from "./contexts/CyclesContext";


export function App() {

  


  return (// necessário wraper para o elementos das rotas usando browser router
  //<ThemeProvider theme = {selectedTheme =="dark" ? defaultTheme : lightTheme}> {/*operadoor ternario que seta dark como default e recebe a alteracao do tema*/}
  <ThemeContextProvider>
       <BrowserRouter> 

        <CycleContextProvider>
            <Router/>
        </CycleContextProvider>
      
      </BrowserRouter>
      
   <GlobalStyle/>
   </ThemeContextProvider>
   //</ThemeProvider>
  )
}


