'use client';
import { useRouter } from 'next/navigation';
import SolicitudForm from '@/components/SolicitudForm';

export default function SolicitudPage() {
    const router = useRouter();
  
    const handleLogout = () => {
      localStorage.removeItem('usuario');
      localStorage.removeItem('rol');
        router.push('/');
    };

  return (
    <main>
      <SolicitudForm />
      <button onClick={handleLogout} className="cerrar-sesion-btn">
        <img src="https://cdn-icons-png.flaticon.com/128/4034/4034229.png" alt="Cerrar sesión" />
      </button>
    </main>
  );
}
