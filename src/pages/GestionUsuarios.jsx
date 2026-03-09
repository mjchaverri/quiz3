import React from 'react'
import AdminUsuarios from '../components/AdminUsuarios'
import Sidebar from '../components/Sidebar'
import RegistroUsuarios from '../components/RegistroUsuarios'
import '../styles/GestionUsuarios.css'

function GestionUsuarios() {
    return (
        <div className="dashboard-container">
            <Sidebar />

            <main className="dashboard-main">
                <div className="dashboard-wrapper">
                    <header className="dashboard-header">
                        <h1>Gestión de Usuarios</h1>
                    </header>

                    <section className="dashboard-section">
                        <AdminUsuarios />
                    </section>

                    <section className="dashboard-section">
                        <h2 className="section-title">Registro de Usuarios</h2>
                        <RegistroUsuarios />
                    </section>
                </div>
            </main>
        </div>
    )
}

export default GestionUsuarios