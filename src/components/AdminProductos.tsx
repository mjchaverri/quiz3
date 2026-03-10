import React from 'react'
import { useEffect, useState } from 'react'
import { getData, deleteData } from '../services/Servicios'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { patchData } from '../services/Servicios'
import '../styles/AdminProductos.css'

interface Producto {
  id: number;
  nombreProducto: string;
  categoriaProducto: string;
  precioProducto: number;
  tamañoProducto: string;
  stockProducto: number;
}

function AdminProductos() {

  const [productos, setProductos] = useState<Producto[]>([])
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("")
  const productosFiltrados = productos.filter((producto) => {
    if (categoriaFiltro === "") {
      return true
    }
    return producto.categoriaProducto === categoriaFiltro
  })
  const [modalShow, setModalShow] = useState<boolean>(false)
  const [productoEditar, setProductoEditar] = useState<Producto | null>(null)
  const [nombreProducto, setNombreProducto] = useState<string>("")
  const [categoriaProducto, setCategoriaProducto] = useState<string>("")
  const [precioProducto, setPrecioProducto] = useState<number>(0)
  const [tamañoProducto, setTamañoProducto] = useState<string>("")
  const [stockProducto, setStockProducto] = useState<number>(0)


  async function mostrarProductos() {
    const data = await getData("productos")
    setProductos(data)
  }

  useEffect(() => {
    mostrarProductos()
  }, [])

  async function eliminarProducto(id: number) {
    await deleteData("productos", id)
    mostrarProductos()
  }

  function abrirEditar(producto: Producto) {

    setProductoEditar(producto)

    setNombreProducto(producto.nombreProducto)
    setCategoriaProducto(producto.categoriaProducto)
    setPrecioProducto(producto.precioProducto)
    setTamañoProducto(producto.tamañoProducto)
    setStockProducto(producto.stockProducto)

    setModalShow(true)

  }
  async function actualizarProducto() {

    type ProductoEditar = {
      nombreProducto: string,
      categoriaProducto: string,
      precioProducto: number,
      tamañoProducto: string,
      stockProducto: number
    }

    const objProductoEditar: ProductoEditar = {
      nombreProducto,
      categoriaProducto,
      precioProducto,
      tamañoProducto,
      stockProducto
    }

    await patchData("productos", objProductoEditar, productoEditar?.id)

    setModalShow(false)

    mostrarProductos()
  }



  return (
    <div className="admin-container">
      <div className="filter-container">
        <h2 className="section-title">Lista de Productos</h2>
        <select className="filter-select" onChange={(e) => setCategoriaFiltro(e.target.value)}>

          <option value="">Todas las categorias</option>
          <option value="frutasVerduras">Frutas y Verduras</option>
          <option value="carnesPescados">Carnes y Pescados</option>
          <option value="lacteos">Lácteos</option>
          <option value="panaderia">Panadería</option>
          <option value="bebidas">Bebidas</option>
          <option value="snacks">Snacks</option>
          <option value="abarrotes">Abarrotes</option>
          <option value="congelados">Congelados</option>
          <option value="limpieza">Limpieza del Hogar</option>
          <option value="higiene">Higiene Personal</option>

        </select>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Precio</th>
            <th>Tamaño</th>
            <th>Stock</th>
            <th>Acciones</th>

          </tr>
        </thead>

        <tbody>

          {productosFiltrados.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombreProducto}</td>
              <td>{producto.categoriaProducto}</td>
              <td>{producto.precioProducto}</td>
              <td>{producto.tamañoProducto}</td>
              <td>{producto.stockProducto}</td>
              <td>
                <button className="btn-editar" onClick={() => abrirEditar(producto)}>Editar</button>
                <button className="btn-eliminar" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        centered
      >

        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <input
            className="modal-input-field"
            type="text"
            value={nombreProducto}
            onChange={(e) => setNombreProducto(e.target.value)}
            placeholder="Nombre"
          />

          <select className="modal-select-field" value={categoriaProducto} onChange={(e) => setCategoriaProducto(e.target.value)}>

            <option value="" disabled>Seleccione una categoría</option>
            <option value="frutasVerduras">Frutas y Verduras</option>
            <option value="carnesPescados">Carnes y Pescados</option>
            <option value="lacteos">Lácteos</option>
            <option value="panaderia">Panadería</option>
            <option value="bebidas">Bebidas</option>
            <option value="snacks">Snacks</option>
            <option value="abarrotes">Abarrotes</option>
            <option value="congelados">Congelados</option>
            <option value="limpieza">Limpieza del Hogar</option>
            <option value="higiene">Higiene Personal</option>

          </select>

          <input
            className="modal-input-field"
            type="number"
            value={precioProducto}
            onChange={(e) => setPrecioProducto(Number(e.target.value))}
            placeholder="Precio"
          />

          <input
            className="modal-input-field"
            type="text"
            value={tamañoProducto}
            onChange={(e) => setTamañoProducto(e.target.value)}
            placeholder="Tamaño"
          />

          <input
            className="modal-input-field"
            type="number"
            value={stockProducto}
            onChange={(e) => setStockProducto(Number(e.target.value))}
            placeholder="Stock"
          />

        </Modal.Body>

        <Modal.Footer>

          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Cancelar
          </Button>

          <Button variant="primary" onClick={actualizarProducto}>
            Guardar Cambios
          </Button>

        </Modal.Footer>

      </Modal>

    </div>
  )
}

export default AdminProductos
