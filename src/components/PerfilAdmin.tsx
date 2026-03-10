import { useState } from "react"
import { useEffect } from "react"
import { patchData } from "../services/ServicioUsuarios"
import { deleteData } from "../services/ServicioUsuarios"
import { useNavigate } from "react-router-dom"


function PerfilAdmin() {
    const [nombre, setNombre] = useState<string>("")
    const [apellido, setApellido] = useState<string>("")
    const [correo, setCorreo] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [textoNombre, setTextoNombre] = useState(JSON.parse(localStorage.getItem("usuario")).nombre)
    const [textoApellido, setTextoApellido] = useState(JSON.parse(localStorage.getItem("usuario")).apellido)
    const [textoCorreo, setTextoCorreo] = useState(JSON.parse(localStorage.getItem("usuario")).correo)
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
        await patchData("usuarios", objUsuarioEditar, JSON.parse(localStorage.getItem("usuario")).id)
    }

    async function eliminarUsuario() {
        const usuarioEliminado = await deleteData("usuarios", JSON.parse(localStorage.getItem("usuario")).id)
        console.log(usuarioEliminado);

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