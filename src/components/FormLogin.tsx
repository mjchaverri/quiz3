import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { getData } from '../services/Servicios';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"

import '../styles/Login.css';

function FormLogin() {

    const [correo, setCorreo] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [mensaje, setMensaje] = useState<string>("");
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        async function cargarUsuarios() {
            const data = await getData("usuarios")
            setUsuarios(data)
        }

        cargarUsuarios()
    }, [])

    function iniciarSesion() {

        if (correo === "" || password === "") {
            setMensaje("Complete todos los campos")
            return
        }

        const usuarioValido = usuarios.find((usuario) => usuario.correo === correo && usuario.password === password);

        if (usuarioValido) {
            localStorage.setItem("usuario", JSON.stringify(usuarioValido))
            if (usuarioValido.rol === "admin") {
                navigate("/gestionProductos")
            } else {
                navigate("/micuenta")
            }
        } else {
            setMensaje("Correo o contraseña incorrectos")
        }


    }


    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Iniciar Sesion</h2>
                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="correo">Correo Electrónico</label>
                        <input
                            className="form-input"
                            type="text"
                            placeholder="ejemplo@correo.com"
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            className="form-input"
                            type="password"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <p className="login-message">{mensaje}</p>

                    <button className="btn-login" onClick={iniciarSesion} type="button">Ingresar</button>
                </form>
                <div className="login-card-footer">
                    <p>¿No tienes una cuenta? <Link to="/registro">Regístrate</Link></p>
                </div>
            </div>
        </div>
    )
}

export default FormLogin