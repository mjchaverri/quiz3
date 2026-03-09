import React from 'react'
import RegistroProductos from '../components/RegistroProductos'
import AdminProductos from '../components/AdminProductos'
import Sidebar from '../components/Sidebar'
import '../styles/GestionProductos.css'

function GestionProductos() {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="dashboard-main">
        <div className="dashboard-wrapper">
          <header className="dashboard-header">
            <h1>Gestión de Productos</h1>
          </header>

          <section className="dashboard-section">
            <AdminProductos />
          </section>

          <section className="dashboard-section">
            <h2 className="section-title">Registro de Productos</h2>
            <RegistroProductos />
          </section>
        </div>
      </main>
    </div>
  )
}

export default GestionProductos