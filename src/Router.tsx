import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import { History } from './pages/History';
import { DefaultLayout } from './layouts/DefaultLayout';

export function Router() {
    return (
<Routes>
    {/* Projeto Timer - Modulo 2 - Aula 1: React Router DOm */}
    
    <Route path='/' element={<DefaultLayout />}> {/* O Default layout irá renderizar as pages home e history  */}
        <Route path='/' element={<Home />} />
        <Route path='/history' element={<History/>} />
    </Route>
</Routes>

    );
}