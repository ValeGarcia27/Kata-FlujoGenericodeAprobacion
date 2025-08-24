'use client';

    import { useState } from 'react';
    import { useRouter } from 'next/navigation';
    import axios from 'axios';
    import styles from '@/styles/login.css';

    export default function LoginPage() {
    const router = useRouter();
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        const res = await axios.post('/api/login', { usuario, contrasena });
        const { success, usuario: user, rol } = res.data;

        if (success) {
            localStorage.setItem('usuario', user);
            localStorage.setItem('rol', rol);
            router.push(rol === 'aprobador' ? '/aprobador' : '/solicitud');
        }
        } catch {
        setError('Credenciales incorrectas');
        }
    };

    return (
        <div className={styles.container}>
        <form onSubmit={handleLogin} className={styles.form}>
            <h2 className={styles.title}>Bienvenido</h2>
            <p className={styles.subtitle}>Ingresa</p>

            {error && <div className={styles.error}>{error}</div>}

            <label className={styles.label}>Usuario</label>
            <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className={styles.input}
            required
            />

            <label className={styles.label}>Contraseña</label>
            <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className={styles.input}
            required
            />

            <button type="submit" className={styles.button}>Login</button>
        </form>
        </div>
    );
    }




