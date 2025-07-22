// src/components/HeaderSimple.jsx
import { useEffect, useState } from 'react';

export default function HeaderSimple() {
  // Estado para almacenar la fecha formateada
  const [fecha, setFecha] = useState('');

  // Efecto que calcula la fecha actual al montar el componente
  useEffect(() => {
    const actualizar = () => {
      const ahora = new Date();
      const opciones = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      setFecha(ahora.toLocaleString('es-ES', opciones));
    };

    actualizar(); // Primera llamada
    const interval = setInterval(actualizar, 60000); // Actualiza cada minuto

    return () => clearInterval(interval);
  }, []);// Dependencias vacías: se ejecuta una vez al montar

  return (
    // Contenedor principal del header
    <header className="w-full h-16 flex items-center justify-between px-6 bg-white border-b sticky top-0 z-10">
      {/* Campo de búsqueda */}
      <input
        type="search"
        placeholder="Buscar producto o cualquier orden..."
        aria-label="Buscar producto o orden"
        className="w-1/2 px-4 py-2 rounded-md border text-sm"
      />
      <span className="text-sm text-gray-500 whitespace-nowrap">{fecha}</span>
    </header>
  );
}
