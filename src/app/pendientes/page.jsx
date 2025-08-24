'use client';
import { useEffect, useState } from 'react';
import BandejaPendientes from '@/components/BandejaPendientes';
import Link from 'next/link';
import '@/styles/BandejaPendientes.css';

export default function PendientesPage() {
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
    <main style={{ padding: '2rem' }}>
      <h1>📬 Bandeja de Pendientes</h1>
      <BandejaPendientes />

      <div style={{ marginTop: '2rem' }}>
        <Link href="/">
          <button className="boton-volver">🔙 Volver al formulario</button>
        </Link>
      </div>
    </main>
  );
}
