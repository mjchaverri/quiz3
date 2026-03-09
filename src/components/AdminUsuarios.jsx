import { useState, useEffect } from "react";
import { getData, deleteData, patchData } from "../services/Servicios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import '../styles/AdminUsuarios.css';

function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [rolFiltro, setRolFiltro] = useState("");
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [usuarioEditar, setUsuarioEditar] = useState(null);

    // Campos del modal
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [rol, setRol] = useState("");

    // Obtener usuarios
    async function mostrarUsuarios() {
        const data = await getData("usuarios");
        setUsuarios(data);
    }

    useEffect(() => {
        mostrarUsuarios();
    }, []);

    // Filtrar por rol
    useEffect(() => {
        if (rolFiltro === "") {
            setUsuariosFiltrados(usuarios);
        } else {
            setUsuariosFiltrados(
                usuarios.filter((u) => u.rol.toLowerCase() === rolFiltro.toLowerCase())
            );
        }
    }, [usuarios, rolFiltro]);

    // Eliminar usuario
    async function eliminarUsuario(id) {
        await deleteData("usuarios", id);
        mostrarUsuarios();
    }

    // Abrir modal para editar
    function abrirEditar(usuario) {
        setUsuarioEditar(usuario);
        setNombre(usuario.nombre);
        setApellido(usuario.apellido);
        setCorreo(usuario.correo);
        setRol(usuario.rol);
        setModalShow(true);
    }

    // Actualizar usuario
    async function actualizarUsuario() {
        const objUsuarioEditar = {
            nombre,
            apellido,
            correo,
            rol
        };
        await patchData("usuarios", objUsuarioEditar, usuarioEditar.id);
        setModalShow(false);
        mostrarUsuarios();
    }

    return (
        <div className="admin-container">
            <div className="filter-container">
                <div>
                <h2 className="section-title">Lista de Usuarios</h2>
                </div>
                <select
                    className="filter-select"
                    onChange={(e) => setRolFiltro(e.target.value)}
                >
                    <option value="">Todos los roles</option>
                    <option value="admin">Admin</option>
                    <option value="cliente">Cliente</option>
                </select>
            </div>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuariosFiltrados.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellido}</td>
                            <td>{usuario.correo}</td>
                            <td>{usuario.rol}</td>
                            <td>
                                <button className="btn-editar-usuario" onClick={() => abrirEditar(usuario)}>Editar</button>
                                <button className="btn-eliminar-usuario" onClick={() => eliminarUsuario(usuario.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        className="modal-user-input"
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <input
                        className="modal-user-input"
                        type="text"
                        placeholder="Apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                    <input
                        className="modal-user-input"
                        type="email"
                        placeholder="Correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                    <select className="modal-user-select" value={rol} onChange={(e) => setRol(e.target.value)}>
                        <option value="" disabled>
                            Seleccione un rol
                        </option>
                        <option value="admin">Admin</option>
                        <option value="cliente">Cliente</option>
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalShow(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={actualizarUsuario}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AdminUsuarios;