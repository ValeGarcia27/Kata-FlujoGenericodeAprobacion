'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import '@/styles/HistorialPorSolicitud.css';

export default function HistorialGeneral() {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    axios.get('/api/solicitudes')
      .then(res => setSolicitudes(res.data.solicitudes))
      .catch(err => console.error('Error al obtener solicitudes:', err));
  }, []);

  useEffect(() => {
    const rol = localStorage.getItem('rol');
    if (rol !== 'aprobador') {
      router.push('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    router.push('/login');
  };

  return (
    <main className="historial-container">
      <h1>📋 Historial General de Solicitudes</h1>
      {solicitudes.length === 0 ? (
        <p>No hay solicitudes registradas.</p>
      ) : (
        <table className="historial-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Solicitante</th>
              <th>Responsable</th>
              <th>Estado</th>
              <th>Fecha de Creación</th>
              <th>Fecha Última Acción</th>
              <th>Comentario</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((s, i) => (
              <tr key={i}>
                <td>{s.titulo}</td>
                <td>{s.descripcion}</td>
                <td>{s.solicitante}</td>
                <td>{s.responsable}</td>
                <td>{s.estado}</td>
                <td>{formatearFecha(s.fecha_creacion)}</td>
                <td>{s.ultima_fecha ? formatearFecha(s.ultima_fecha) : '—'}</td>
                <td>{s.ultimo_comentario || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

function formatearFecha(fecha) {
  const f = new Date(fecha);
  return `${f.toLocaleDateString()} ${f.toLocaleTimeString()}`;
}
