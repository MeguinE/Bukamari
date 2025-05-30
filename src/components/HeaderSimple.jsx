// src/components/HeaderSimple.jsx
import { useEffect, useState } from 'react';

export default function HeaderSimple() {
  const [fecha, setFecha] = useState('');

  useEffect(() => {
    const ahora = new Date();
    const opciones = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    setFecha(ahora.toLocaleString('es-ES', opciones));
  }, []);

  return (
    <header className="w-full h-16 flex items-center justify-between px-6 bg-white border-b sticky top-0 z-10">
      <input
        type="text"
        placeholder="Buscar producto o cualquier orden..."
        className="w-1/2 px-4 py-2 rounded-md border text-sm"
      />
      <span className="text-sm text-gray-500 whitespace-nowrap">{fecha}</span>
    </header>
  );
}
