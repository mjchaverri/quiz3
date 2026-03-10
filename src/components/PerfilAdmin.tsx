import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { patchData } from "../services/Servicios"
import { deleteData } from "../services/Servicios"
function PerfilAdmin() {
    const [nombre, setNombre] = useState<string>("")
    const [apellido, setApellido] = useState<string>("")
    const [correo, setCorreo] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    
    // Get user from localStorage safely
    const storedUser = localStorage.getItem("usuario")
    const user = storedUser ? JSON.parse(storedUser) : {}

    const [textoNombre, setTextoNombre] = useState<string>(user.nombre || "")
    const [textoApellido, setTextoApellido] = useState<string>(user.apellido || "")
    const [textoCorreo, setTextoCorreo] = useState<string>(user.correo || "")
    const navigate = useNavigate()
    const [textoBoton, setTextoBoton] = useState<boolean>(true)


    function manejoSesion() {
        if (localStorage.getItem("usuario") != null) {
            setTextoBoton(false)
            localStorage.clear()
            navigate("/login")
        } else {
            setTextoBoton(true)
        }
    }

    


    async function actualizarUsuario() {
        type UsuarioEditar = {
            nombre: string,
            apellido: string,
            correo: string
        }
        
        const objUsuarioEditar: UsuarioEditar = {
            nombre: nombre,
            apellido: apellido,
            correo: correo
        }
        
        const storedUser = localStorage.getItem("usuario")
        if (storedUser) {
            const user = JSON.parse(storedUser)
            await patchData("usuarios", objUsuarioEditar, user.id)
        }
    }

    async function eliminarUsuario() {
        const storedUser = localStorage.getItem("usuario")
        if (storedUser) {
            const user = JSON.parse(storedUser)
            const usuarioEliminado = await deleteData("usuarios", user.id)
            console.log(usuarioEliminado);
        }
    }

    return (
        <>
            <input type="text" onChange={(e) => setNombre(e.target.value)} />
            <input type="text" onChange={(e) => setApellido(e.target.value)} />
            <input type="email" onChange={(e) => setCorreo(e.target.value)} />

            <button onClick={actualizarUsuario} type="button">Actualizar</button>

            <div>
                <h2>Nombre: {textoNombre}</h2>
                <h2>Apellido: {textoApellido} </h2>
                <h2>Correo: {textoCorreo}</h2>
                <button onClick={eliminarUsuario} type="button">Eliminar Cuenta</button>
            </div>

            <button
                onClick={manejoSesion}
            >
                {textoBoton ? "Cerrar Sesion" : "Iniciar Sesion"}
            </button>

        </>
    )
}
export default PerfilAdmin