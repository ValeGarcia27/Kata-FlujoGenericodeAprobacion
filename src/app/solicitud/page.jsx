'use client';
import { useEffect, useState } from 'react';
    import { useRouter } from 'next/navigation';
import SolicitudForm from '@/components/SolicitudForm';

export default function SolicitudPage() {
  useEffect(() => {
    const rol = localStorage.getItem('rol');
      if (rol !== 'solicitante') {
        router.push('/login');
      }
  }, []);

  const router = useRouter();
  
    const handleLogout = () => {
      localStorage.removeItem('usuario');
      localStorage.removeItem('rol');
        router.push('/'); // Esto te lleva a la raíz (login)
    };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>📝 Crear Nueva Solicitud</h1>
      <SolicitudForm />
      <button onClick={handleLogout} className="cerrar-sesion-btn">
            🔓 Cerrar sesión
      </button>
    </main>
  );
}
