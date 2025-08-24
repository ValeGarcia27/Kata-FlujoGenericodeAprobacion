'use client';

import { useState } from 'react';
import axios from 'axios';
import '@/styles/SolicitudForm.css';

export default function SolicitudForm() {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    solicitante: '',
    responsable: '',
    tipo: 'despliegue',
  });

  const [mensaje, setMensaje] = useState(null);

  const tipos = ['despliegue', 'acceso', 'cambio técnico', 'otro'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/solicitudes', formData);
      if (res.data.message) {
        setMensaje(`✅ Solicitud creada correctamente`);
        setFormData({
          titulo: '',
          descripcion: '',
          solicitante: '',
          responsable: '',
          tipo: 'despliegue',
        });
      }
    } catch (err) {
      console.error(err);
      setMensaje('❌ Error al enviar la solicitud');
    }
  };

    const handleEnviarCorreo = () => {
      const destinatario = "valentinagarciaosorio5@gmail.com";
      const asunto = "Nueva Solicitud";
      const cuerpo = "Se ha creado una nueva solicitud.";

      const mailto = `mailto:${destinatario}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
      window.location.href = mailto;
    };

  return (
    <form className="solicitud-form" onSubmit={handleSubmit}>
      <h2>Crear Solicitud de Aprobación</h2>

      <label>Título:</label>
      <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />

      <label>Descripción:</label>
      <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required />

      <label>Solicitante:</label>
      <input type="text" name="solicitante" value={formData.solicitante} onChange={handleChange} required />

      <label>Responsable:</label>
      <input type="text" name="responsable" value={formData.responsable} onChange={handleChange} required />

      <label>Tipo de Solicitud:</label>
      <select name="tipo" value={formData.tipo} onChange={handleChange}>
        {tipos.map((tipo) => (
          <option key={tipo} value={tipo}>{tipo}</option>
        ))}
      </select>

      <button onClick={handleEnviarCorreo} type="submit">Enviar Solicitud</button>

      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}
