import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar() {
    const [usuario, setUsuario] = useState(localStorage.getItem("usuario"))
    const navigate = useNavigate()

    function cerrarSesion() {
        localStorage.removeItem('usuario')
        setUsuario(null)
        navigate("/")
    }

    function irInicio() {
        navigate("/")
    }

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <h2>Panel de Administración</h2>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    <li className="nav-item" onClick={() => navigate("/gestionProductos")}>Gestión de Productos</li>
                    <li className="nav-item" onClick={() => navigate("/gestionUsuarios")}>Gestión de Usuarios</li>
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button className="btn-home" onClick={irInicio}>Ir a Inicio</button>
                <button className="btn-logout" onClick={cerrarSesion}>Cerrar sesión</button>

            </div>
        </div>
    );
}

export default Sidebar;
