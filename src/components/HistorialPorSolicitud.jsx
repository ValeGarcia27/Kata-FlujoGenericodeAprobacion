'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import '@/styles/HistorialPorSolicitud.css';

export default function HistorialPorSolicitud({ uuid }) {
  const [historial, setHistorial] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const res = await axios.get(`/api/historial?uuid=${uuid}`);
        setHistorial(res.data.historial);
      } catch (err) {
        console.error(err);
        setError('Error al obtener historial');
      }
    };

    if (uuid) fetchHistorial();
  }, [uuid]);

  if (error) return <p>{error}</p>;
  if (!historial || historial.length === 0) return <p>Sin historial disponible.</p>;

  return (
    <div className="historial-box">
      <h3>🕓 Historial de Aprobación</h3>
      <ul>
        {historial.map((entry, idx) => (
          <li key={idx}>
            <strong>{entry.usuario}</strong> – {entry.accion.toUpperCase()}  
            <br />
            <em>{new Date(entry.fecha).toLocaleString()}</em>
            <br />
            Comentario: {entry.comentario}
          </li>
        ))}
      </ul>
    </div>
  );
}
