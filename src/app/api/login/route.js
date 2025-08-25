    import { NextResponse } from 'next/server';
    import { poolPromise } from '@/lib/db';

    export async function POST(request) {
    try {
        const { usuario, contrasena } = await request.json();
        const pool = await poolPromise;

        const result = await pool.request()
        .input('usuario', usuario)
        .input('contrasena', contrasena)
        .query(`
            SELECT rol FROM usuarios 
            WHERE usuario = @usuario AND contrasena = @contrasena
        `);

        if (result.recordset.length === 0) {
        return NextResponse.json({ success: false, error: 'Credenciales inválidas' }, { status: 401 });
        }

        const rol = result.recordset[0].rol;

        return NextResponse.json({ success: true, usuario, rol }, { status: 200 });

    } catch (error) {
        console.error('❌ Error en el login:', error);
        return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
    }
    }
