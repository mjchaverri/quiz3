import React from "react";
import frutas from '../img/frutasyverduras.png';
import carnes from '../img/carnes.png'
import lacteos from '../img/lacteos.png'
import panaderia from '../img/panaderia.png'
import bebidas from '../img/bebidas.png'
import snacks from '../img/snacks.png'
import abarrotes from '../img/abarrotes.png'
import congelados from '../img/congelados.png'
import limpieza from '../img/limpieza.png'
import higiene from '../img/higiene.png'
import { useEffect, useState } from 'react'
import { getData } from "../services/Servicios";

import "../styles/MainHome.css";

function MainHome() {
  const [productos, setProductos] = useState([])
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  async function mostrarProductos() {
    const data = await getData("productos");
    setProductos(data);
  }

  useEffect(() => {
    mostrarProductos();
  }, []);

  const productosFiltrados = productos.filter((producto) => {
    if (categoriaFiltro === "") return true;
    return producto.categoriaProducto === categoriaFiltro;
  });

  return (
    <div className="categorias-grid">
      <div>

        <div className="categoria-card" >
          <img src={frutas} alt="Frutas y Verduras" />
          <h3>Frutas y Verduras</h3>
        </div>

        <div className="categoria-card">
          <img src={carnes} alt="Carne" />
          <h3>Carnes y Pescados</h3>
        </div>

        <div className="categoria-card">
          <img src={lacteos} alt="Lácteos" />
          <h3>Lácteos</h3>
        </div>

        <div className="categoria-card">
          <img src={panaderia} alt="Panadería" />
          <h3>Panadería</h3>
        </div>

        <div className="categoria-card">
          <img src={bebidas} alt="Bebidas" />
          <h3>Bebidas</h3>
        </div>

        <div className="categoria-card">
          <img src={snacks} alt="Snacks" />
          <h3>Snacks</h3>
        </div>

        <div className="categoria-card">
          <img src={abarrotes} alt="Abarrotes" />
          <h3>Abarrotes</h3>
        </div>

        <div className="categoria-card">
          <img src={congelados} alt="Congelados" />
          <h3>Congelados</h3>
        </div>

        <div className="categoria-card">
          <img src={limpieza} alt="Limpieza del Hogar" />
          <h3>Limpieza del Hogar</h3>
        </div>

        <div className="categoria-card">
          <img src={higiene} alt="Higiene Personal" />
          <h3>Higiene Personal</h3>
        </div>
      </div>

      <div className="filter-container">
        <h2>¡Descubri Nuestros Productos!</h2>
        <select
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
        >
          <option value="">Todas las categorías</option>
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

      <div className="productos-grid">
        {productosFiltrados.map((producto) => (
          <div className="producto-card" key={producto.id}>
            <h3>{producto.nombreProducto}</h3>
            <p><strong>Categoría:</strong> {producto.categoriaProducto}</p>
            <p><strong>Precio:</strong> ${producto.precioProducto}</p>
            <p><strong>Tamaño:</strong> {producto.tamañoProducto}</p>
          </div>
        ))}
      </div>

    </div>

  );
}

export default MainHome;