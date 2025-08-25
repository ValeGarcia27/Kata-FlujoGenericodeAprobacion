'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import '@/styles/BandejaPendientes.css';

export default function BandejaPendientes() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [comentarios, setComentarios] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    obtenerSolicitudes();
  }, []);

  const obtenerSolicitudes = async () => {
    try {
      const res = await axios.get('/api/solicitudes');
      setSolicitudes(res.data.solicitudes || []);
    } catch (error) {
      console.error('❌ Error al obtener solicitudes:', error);
    }
  };

  const handleComentarioChange = (uuid, value) => {
    setComentarios((prev) => ({ ...prev, [uuid]: value }));
  };

  const handleAccion = async (uuid, estado) => {
    if (loading) return;
    setLoading(true);
    try {
      const comentario = comentarios[uuid] || '';
      await axios.patch('/api/solicitudes', {
        uuid,
        estado,
        comentario,
        usuario: 'responsable_demo',
      });
      setComentarios((prev) => ({ ...prev, [uuid]: '' }));
      await obtenerSolicitudes(); 
    } catch (error) {
      console.error('❌ Error al actualizar solicitud:', error);
    } finally {
      setLoading(false);
    }
  };

  const pendientes = solicitudes.filter((s) => s.estado === 'pendiente');

  return (
    <div className="bandeja-container">
      {pendientes.length > 0 ? (
        pendientes.map((sol) => (
          <div key={sol.uuid} className="solicitud-card">
            <p><strong>Título:</strong> {sol.titulo}</p>
            <p><strong>Descripción:</strong> {sol.descripcion}</p>
            <p><strong>Responsable:</strong> {sol.responsable}</p>

            <textarea
              placeholder="Escribe un comentario..."
              value={comentarios[sol.uuid] || ''}
              onChange={(e) => handleComentarioChange(sol.uuid, e.target.value)}
              disabled={loading}
            />

            <div className="acciones">
              <button
                onClick={() => handleAccion(sol.uuid, 'aprobado')}
                className="btn-aprobar"
                disabled={loading}
              >
                Aprobar
              </button>
              <button
                onClick={() => handleAccion(sol.uuid, 'rechazado')}
                className="btn-rechazar"
                disabled={loading}
              >
                Rechazar
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No hay solicitudes pendientes.</p>
      )}
    </div>
  );
}
