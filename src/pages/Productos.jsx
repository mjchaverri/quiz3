import { useEffect, useState } from "react"
import { getData } from "../services/Servicios";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/Productos.css";

function Productos() {
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(
        localStorage.getItem("categoria seleccionada") || ""
    );
    const [listaProductos, setListaProductos] = useState([])

    useEffect(() => {
        async function mostrarProductos() {
            let url = "http://localhost:3001/productos";
            if (categoriaSeleccionada) {
                url += `?categoriaProducto=${categoriaSeleccionada}`;
            }
            const peticion = await fetch(url);
            const data = await peticion.json();
            setListaProductos(data);
            console.log(data);
        }
        mostrarProductos();
    }, [categoriaSeleccionada]);

    const handleLimpiarFiltro = () => {
        setCategoriaSeleccionada("");
        localStorage.removeItem("categoria seleccionada");
    };

    return (
        <>
            <div>
                <NavBar />
            </div>
            <div className="productos">

                <h1>Productos</h1>
                <button onClick={handleLimpiarFiltro}>Limpiar Filtro</button>
                {listaProductos.map((producto) => (
                    <div key={producto.id}>
                        <h2>{producto.nombreProducto}</h2>
                        <p>{producto.categoriaProducto}</p>
                        <p>{producto.precioProducto}</p>
                        <p>{producto.tamañoProducto}</p>
                    </div>
                ))}

            </div>
            <div>
                <Footer />
            </div>
        </>
    )

}
export default Productos;