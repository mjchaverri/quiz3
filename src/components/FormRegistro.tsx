import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { postData } from '../services/Servicios'
import { getData } from '../services/Servicios'
import { Link } from 'react-router-dom'

import '../styles/Registro.css'

function FormRegistro() {

    const [nombre, setNombre] = useState<string>("");
    const [apellido, setApellido] = useState<string>("");
    const [correo, setCorreo] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [mensaje, setMensaje] = useState<string>("");
    const [usuarios, setUsuarios] = useState<any[]>([])


    useEffect(() => {
        async function cargarUsuarios() {
            const data = await getData("usuarios")
            setUsuarios(data)
        }

        cargarUsuarios()
    }, [])


    async function agregarUsuario() {

        type Usuario = {
            nombre: string,
            apellido: string,
            correo: string,
            password: string,
            rol: string
        }

        const objUsuario : Usuario = {
            nombre,
            apellido,
            correo,
            password,
            rol: "cliente"
        }

        if (nombre === "" || apellido === "" || correo === "" || password === "") {
            setMensaje("Complete todos los campos")
            return
        }

        const correoExiste = usuarios.find((usuario) => usuario.correo === correo)

        if (correoExiste) {
            setMensaje("El correo ya existe")
            return
        }

        await postData(objUsuario, "usuarios")
        setMensaje("Usuario registrado exitosamente")

    }

    return (

        <div className="register-container">
            <div className="register-card">
                <h2>Crea tu cuenta</h2>
                <form className="register-form">

                    <div className="register-grid">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                className="form-input"
                                type="text"
                                placeholder="Tu nombre"
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="apellido">Apellido</label>
                            <input
                                className="form-input"
                                type="text"
                                placeholder="Tu apellido"
                                onChange={(e) => setApellido(e.target.value)}
                            />
                        </div>
                    </div>

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
                            placeholder="Mínimo 6 caracteres"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <p className={`register-message ${mensaje.includes("exitosamente") ? "" : "error"}`}>
                        {mensaje}
                    </p>

                    <button className="btn-register" onClick={agregarUsuario} type="button">Completar Registro</button>

                </form>
                <div className="register-card-footer">
                    <p>¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>
                </div>
            </div>
        </div>
    )
}

export default FormRegistro
