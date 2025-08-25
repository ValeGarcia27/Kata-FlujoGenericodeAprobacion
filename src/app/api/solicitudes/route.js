import { NextResponse } from 'next/server';
import { poolPromise } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
  try {
    const body = await request.json();
    const { titulo, descripcion, solicitante, responsable, tipo } = body;

    const uuid = uuidv4();
    const pool = await poolPromise;

    await pool.request()
      .input('uuid', uuid)
      .input('titulo', titulo)
      .input('descripcion', descripcion)
      .input('solicitante', solicitante)
      .input('responsable', responsable)
      .input('tipo', tipo)
      .input('estado', 'pendiente')
      .query(`
        INSERT INTO solicitudes (
          uuid, titulo, descripcion, solicitante, responsable, tipo, estado, fecha_creacion
        ) VALUES (
          @uuid, @titulo, @descripcion, @solicitante, @responsable, @tipo, @estado, GETDATE()
        )
      `);

    return NextResponse.json({ message: 'Solicitud creada correctamente', uuid }, { status: 201 });

  } catch (error) {
    console.error('❌ Error al crear solicitud:', error);
    return NextResponse.json({ error: 'Error al crear solicitud' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query(`
      SELECT 
        s.*, 
        s.fecha_accion AS ultima_fecha,
        h.comentario AS ultimo_comentario
        --, h.usuario AS ultimo_usuario
      FROM solicitudes s
      OUTER APPLY (
        SELECT TOP 1 comentario, usuario
        FROM historial
        WHERE solicitud_uuid = s.uuid
        ORDER BY fecha DESC
      ) h
      ORDER BY s.fecha_creacion DESC
    `);

    return NextResponse.json({ solicitudes: result.recordset }, { status: 200 });

  } catch (error) {
    console.error('❌ Error al obtener solicitudes:', error);
    return NextResponse.json({ error: 'Error al obtener solicitudes' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { uuid, estado, comentario, usuario = 'responsable_demo' } = await request.json();

    if (!uuid || !estado) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    const pool = await poolPromise;

    await pool.request()
      .input('uuid', uuid)
      .input('estado', estado)
      .query(`
        UPDATE solicitudes
        SET estado = @estado,
            fecha_accion = GETDATE()
        WHERE uuid = @uuid
      `);

    await pool.request()
      .input('solicitud_uuid', uuid)
      .input('usuario', usuario)
      .input('accion', estado)
      .input('comentario', comentario || '')
      .query(`
        INSERT INTO historial (
          solicitud_uuid, usuario, accion, comentario, fecha
        ) VALUES (
          @solicitud_uuid, @usuario, @accion, @comentario, GETDATE()
        )
      `);

    return NextResponse.json({ message: 'Estado actualizado y comentario registrado' });

  } catch (error) {
    console.error('❌ Error al actualizar estado y guardar historial:', error);
    return NextResponse.json({ error: 'Error al actualizar solicitud' }, { status: 500 });
  }
}
