import '@/styles/globals.css';

export const metadata = {
  title: 'Flujo de Aprobación',
  description: 'App para gestión de solicitudes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <main className=''>{children}</main>
      </body>
    </html>
  );
}
