import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayoutContainer } from "./styles";

export function DefaultLayout() {
    return(
        <LayoutContainer>
            <Header />{/* Abaixo do header é que virá o conteudo, o header ficara fixo*/}
            <Outlet /> {/*  Aqui definirá o conteudo a ser exibido, se home ou history  */}
        </LayoutContainer>
    )
}