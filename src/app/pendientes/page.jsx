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

  return (
    <main style={{ padding: '2rem' }}>
      <h1 className='titulo-pendientes'>Bandeja de Pendientes</h1>
      <BandejaPendientes />

      <div style={{ marginTop: '2rem' }}>
        <Link href="/aprobador">
          <button className="boton-volver">
            <img src="https://png.pngtree.com/png-clipart/20190705/original/pngtree-arrow-left-vector-icon-png-image_4279219.jpg" alt="Volver" />
          </button>
        </Link>
      </div>
    </main>
  );
}
