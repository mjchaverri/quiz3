import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

function NavBar() {
  const [btnLogin, setBtnLogin] = useState("Iniciar Sesión")
  const [usuario, setUsuario] = useState(localStorage.getItem("usuario"))
  const navigate = useNavigate()

  useEffect(() => {
    function cargarSesion() {
      if (usuario) {
        setBtnLogin("Cerrar Sesión")
      } else {
        setBtnLogin("Iniciar Sesión")
      }
    }
    cargarSesion()
  }, [usuario])

  function irIniciarSesion() {
    navigate("/login")
  }

  function irRegistro() {
    navigate("/registro")
  }

  function irMiCuenta() {
    if (!usuario) return;

    const usuarioActual = JSON.parse(usuario);

    if (usuarioActual.rol === "admin") {
      navigate("/gestionProductos");
    } else {
      navigate("/micuenta");
    }
  }

  function cerrarSesion() {
    localStorage.removeItem('usuario')
    setUsuario(null)
    navigate("/");
  }

  return (
    <div className="navbar">
      <h1 className="navbar-logo" onClick={() => navigate("/")}>
        La Tiendita
      </h1>

      <div className="navbar-actions">
        {usuario && (
          <button className="btn-nav btn-account-nav" onClick={irMiCuenta}>
            Mi cuenta
          </button>
        )}

        <button
          className="btn-nav btn-primary-nav"
          type="button"
          onClick={() => {
            if (btnLogin === "Iniciar Sesión") {
              irIniciarSesion()
            } else {
              cerrarSesion()
            }
          }}
        >
          {btnLogin}
        </button>

        {btnLogin === "Iniciar Sesión" && (
          <button className="btn-nav btn-secondary-nav" type="button" onClick={irRegistro}>
            Registrarse
          </button>
        )}
      </div>
    </div>
  );
}

export default NavBar;