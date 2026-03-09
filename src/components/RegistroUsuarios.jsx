import React, { useState } from "react";
import { postData } from "../services/Servicios";
import '../styles/RegistroUsuarios.css';

function RegistroUsuarios() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("cliente");

    async function registrarUsuario() {
        const objUsuario = {
            nombre,
            apellido,
            correo,
            password,
            rol
        };

        await postData("usuarios", objUsuario);

        // Limpiar formulario
        setNombre("");
        setApellido("");
        setCorreo("");
        setPassword("");
        setRol("cliente");
        alert("Usuario registrado!");
    }

    return (
        <div className="user-registration-container">
            <div className="user-registration-form">
                <label className="user-input-label">Nombre</label>
                <input
                    className="user-input-field"
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <label className="user-input-label">Apellido</label>
                <input
                    className="user-input-field"
                    type="text"
                    placeholder="Apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                />

                <label className="user-input-label">Correo Electrónico</label>
                <input
                    className="user-input-field"
                    type="email"
                    placeholder="Correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />

                <label className="user-input-label">Contraseña</label>
                <input
                    className="user-input-field"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label className="user-input-label">Rol</label>
                <select className="user-select-field" value={rol} onChange={(e) => setRol(e.target.value)}>
                    <option value="cliente">Cliente</option>
                    <option value="admin">Admin</option>
                </select>

                <button className="btn-register-user" onClick={registrarUsuario}>Registrar Usuario</button>
            </div>
        </div>
    );
}

export default RegistroUsuarios;