import '@/styles/globals.css';

export const metadata = {
  title: 'Flujo de Aprobación',
  description: 'App para gestión de solicitudes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <header style={{ backgroundColor: '#0057a3', color: '#fff', padding: '1rem' }}>
          <h1>Flujo Genérico de Aprobación</h1>
        </header>
        <main style={{ padding: '2rem' }}>{children}</main>
        <footer style={{ backgroundColor: '#f0f0f0', textAlign: 'center', padding: '1rem' }}>
          <p>© 2025</p>
        </footer>
      </body>
    </html>
  );
}
