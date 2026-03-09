import { useState } from "react"
import { useEffect } from "react"
import { patchData } from "../services/Servicios"
import { deleteData } from "../services/Servicios"
import { useNavigate } from "react-router-dom"
import NavBar from '../components/NavBar.jsx'
import Footer from '../components/Footer.jsx'
import "../styles/MiCuenta.css"

function MiCuenta() {
  const usuarioLocal = JSON.parse(localStorage.getItem("usuario")) || {}
  const [nombre, setNombre] = useState(usuarioLocal.nombre || "")
  const [apellido, setApellido] = useState(usuarioLocal.apellido || "")
  const [correo, setCorreo] = useState(usuarioLocal.correo || "")
  const [textoNombre, setTextoNombre] = useState(JSON.parse(localStorage.getItem("usuario")).nombre)
  const [textoApellido, setTextoApellido] = useState(JSON.parse(localStorage.getItem("usuario")).apellido)
  const [textoCorreo, setTextoCorreo] = useState(JSON.parse(localStorage.getItem("usuario")).correo)
  const navigate = useNavigate()
  const [textoBoton, setTextoBoton] = useState(true)


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
    const usuarioActual = JSON.parse(localStorage.getItem("usuario"))
    const objUsuarioEditar = {
      ...usuarioActual,
      nombre: nombre,
      apellido: apellido,
      correo: correo
    }
    await patchData("usuarios", objUsuarioEditar, usuarioActual.id)

    // Actualizar estados para mostrar la información editada
    setTextoNombre(nombre)
    setTextoApellido(apellido)
    setTextoCorreo(correo)

    // Actualizar localStorage para persistencia
    localStorage.setItem("usuario", JSON.stringify(objUsuarioEditar))

    alert("Usuario actualizado correctamente")
  }

  async function eliminarUsuario() {
    const usuarioEliminado = await deleteData("usuarios", JSON.parse(localStorage.getItem("usuario")).id)
    console.log(usuarioEliminado);

  }

  return (
    <div>

      <div>
        <NavBar />
      </div>

      <div className="infoCuenta">
        <div>

          <label htmlFor="nombre">Nombre:</label>
          <input type="text" onChange={(e) => setNombre(e.target.value)} />

          <label htmlFor="apellido">Apellido:</label>
          <input type="text" onChange={(e) => setApellido(e.target.value)} />

          <label htmlFor="correo">Correo:</label>
          <input type="email" onChange={(e) => setCorreo(e.target.value)} />

          <button onClick={actualizarUsuario} type="button">Actualizar</button>
        </div>

        <div>
          <h2><strong>Nombre:</strong> {textoNombre}</h2>
          <h2><strong>Apellido:</strong> {textoApellido} </h2>
          <h2><strong>Correo:</strong> {textoCorreo}</h2>
          <button onClick={eliminarUsuario} type="button">Eliminar Cuenta</button>
          <button
            onClick={manejoSesion}
          >
            {textoBoton ? "Cerrar Sesion" : "Iniciar Sesion"}
          </button>
        </div>

      </div>

      <div>
        <Footer />
      </div>

    </div>
  )
}

export default MiCuenta
