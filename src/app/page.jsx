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
        <div className='container'>
            <div className='izqFormulario'>
                <form onSubmit={handleLogin} className='form'>
                    <h2 className='tituloForm'>Bienvenido</h2>
                    <p>Ingresa tus credenciales para Inicio de Sesión</p>

                    {error && <div className={styles.error}>{error}</div>}

                    <div className='inputsContenedor'>
                        <label className='Usuario'>Usuario</label>
                        <input
                        type="text"
                        value={usuario}
                        placeholder="Example@email.com"
                        onChange={(e) => setUsuario(e.target.value)}
                        className='inputs'
                        required
                        />
                    </div>

                    <div className='inputsContenedor'>
                        <label className='Password'>Contraseña</label>
                        <input
                        type="password"
                        placeholder="Ingrese su contraseña"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        className='inputs'
                        required
                        />
                    </div>

                    <button type="submit" className='Button'>Login</button>
                </form>
            </div>
            
            <div className='derFormulario'>
                <img src="https://images.unsplash.com/photo-1580124917341-d318cbacc34f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMGZsb3dlcnxlbnwwfHwwfHx8MA%3D%3D" alt="img"/>
            </div>
        </div>
    );
    }




