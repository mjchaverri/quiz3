import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import Registro from '../pages/Registro.jsx'
import MiCuenta from '../pages/MiCuenta.jsx'
import GestionProductos from '../pages/GestionProductos.jsx'
import GestionUsuarios from '../pages/GestionUsuarios.jsx'



import Productos from '../pages/Productos.jsx'
import PrivateRoutes from './PrivateRoute'

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="registro" element={<Registro />}></Route>
        <Route path="/micuenta" element={<MiCuenta />}></Route>
        <Route path="/gestionProductos" element={<PrivateRoutes><GestionProductos /></PrivateRoutes>}></Route>
        <Route path="/gestionUsuarios" element={<PrivateRoutes><GestionUsuarios /></PrivateRoutes>}></Route>
        <Route path="/productos" element={<Productos />}></Route>

      </Routes>
    </Router>
  )
}

export default Routing