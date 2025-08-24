    'use client';

    import Link from 'next/link';
    import { useRouter } from 'next/navigation';
    import '@/styles/Page.css';

    export default function Home() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        localStorage.removeItem('rol');
        router.push('/'); // Esto te lleva a la raíz (login)
    };
    return (
        <main className="home-container">
        <h1>📌 Bienvenido al Sistema de Solicitudes</h1>
        <p>Selecciona tu rol para continuar:</p>

        <div className="roles-container">
            <Link href="/pendientes">
            <button className="btn-warning">📬 Soy el aprobador</button>
            </Link>

            <Link href="/historial">
            <button className="btn-secondary">📜 Ver historial</button>
            </Link>
        </div>
        <button onClick={handleLogout} className="cerrar-sesion-btn">
            🔓 Cerrar sesión
        </button>
        </main>
    );
    }