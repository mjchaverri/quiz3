import React from 'react'
import { useState } from 'react'
import { postData } from '../services/Servicios'
import '../styles/RegistroProductos.css'

function RegistroProductos() {
    const [nombreProducto, setNombreProducto] = useState("")
    const [categoriaProducto, setCategoriaProducto] = useState("")
    const [precioProducto, setPrecioProducto] = useState("")
    const [tamañoProducto, setTamañoProducto] = useState("")
    const [stockProducto, setStockProducto] = useState("")
    const [mensaje, setMensaje] = useState("")


    async function agregarProducto() {

        if (nombreProducto === "" || categoriaProducto === "" || precioProducto === "" || tamañoProducto === "" || stockProducto === "") {
            setMensaje("Complete todos los campos")
            return
        }

        const objProducto = {
            nombreProducto,
            categoriaProducto,
            precioProducto,
            tamañoProducto,
            stockProducto,

        }

        await postData(objProducto, "productos")

        // limpiar formulario
        setNombreProducto("")
        setCategoriaProducto("")
        setPrecioProducto("")
        setTamañoProducto("")
        setStockProducto("")

        setMensaje("Producto agregado exitosamente")
        setTimeout(() => {
            setMensaje("")
        }, 3000)
        window.location.reload()

    }



    return (
        <div className="registration-container">
            <form className="registration-form">
                <label className="input-label" htmlFor="nombreProducto">Nombre del Producto:</label>
                <input className="input-field" type="text" value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} />

                <label className="input-label" htmlFor="categoriaProducto">Categoria del Producto:</label>
                <select className="input-field" value={categoriaProducto} onChange={(e) => setCategoriaProducto(e.target.value)}>
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

                <label className="input-label" htmlFor="precioProducto">Precio del Producto:</label>
                <input className="input-field" type="number" value={precioProducto} onChange={(e) => setPrecioProducto(e.target.value)} />

                <label className="input-label" htmlFor="tamañoProducto">Tamaño del Producto:</label>
                <input className="input-field" type="text" value={tamañoProducto} onChange={(e) => setTamañoProducto(e.target.value)} />

                <label className="input-label" htmlFor="stockProducto">Stock del Producto:</label>
                <input className="input-field" type="number" value={stockProducto} onChange={(e) => setStockProducto(e.target.value)} />

                <p className="status-message">{mensaje}</p>
                <button className="btn-submit" onClick={agregarProducto} type="button" >Agregar</button>


            </form>

        </div>
    )
}

export default RegistroProductos
