    'use client';

    import Link from 'next/link';
    import { useRouter } from 'next/navigation';
    import '@/styles/page.css';

    export default function Home() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        localStorage.removeItem('rol');
        router.push('/');
    };
    return (
        <div className="home-container">
            
            <div className="left">
                <h1><span>Bienvenido</span> al Sistema de Solicitudes</h1>
                <p>Selecciona tu rol para continuar:</p>

                <div className="roles-container">
                    <Link href="/pendientes">
                    <button className="btn-warning">Aprobar Solicitudes</button>
                    </Link>

                    <Link href="/historial">
                    <button className="btn-secondary">Ver historial</button>
                    </Link>
                </div>
                <button onClick={handleLogout} className="cerrar-sesion-btn">
                    <img src="https://cdn-icons-png.flaticon.com/128/4034/4034229.png" alt="Cerrar sesión" />
                </button>
            </div>
            <div className="rigth">
                <img src="https://i.pinimg.com/736x/c6/6a/47/c66a47ed69523ba07960903e52d0ba9c.jpg" alt="img" />
            </div>
        </div>
    );
    }