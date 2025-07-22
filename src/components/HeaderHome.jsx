// Este componente es el encabezado de la pantalla principal (HeaderHome)
// @ts-check
import { useState } from 'react';

/**
 * Componente de encabezado para la vista principal
 * @param {Object} props
 * @param {string} props.fecha - Fecha a mostrar
 * @param {() => void} props.onAddMesa - Función para agregar mesa
 * @param {(term: string) => void} [props.onSearch] - Función de búsqueda opcional
 */
export default function HeaderHome({ fecha, onAddMesa, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Maneja el cambio en el campo de búsqueda
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio
   */
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };
  return (
    // Contenedor principal del header
    <header
      className="
        w-full               /* Ancho completo */
        h-16                 /* Alto fijo */
        flex                 /* Usa flexbox */
        items-center         /* Centra verticalmente los elementos */
        justify-between      /* Distribuye elementos a los extremos */
        px-6                 /* Padding horizontal */
        bg-white             /* Fondo blanco */
        border-b             /* Borde inferior */
        sticky top-0         /* Se queda fijo arriba al hacer scroll */
        z-10                 /* Prioridad en el apilado */
      "
    >
      {/* Campo de búsqueda */}
      <input
        type="search" // Mejor que "text" para semántica de búsqueda
        placeholder="Buscar producto o cualquier orden..."
        aria-label="Buscar producto o orden" // Accesibilidad
        value={searchTerm}
        onChange={handleSearch}
        className="
          w-1/2               /* Ocupa la mitad del ancho disponible */
          px-4 py-2           /* Padding interno */
          rounded-md          /* Bordes redondeados */
          border              /* Borde del input */
          border-gray-300     /* Color del borde */
          text-sm             /* Texto pequeño */
          focus:outline-none  /* Quita outline default */
          focus:ring-2        /* Añade un ring al enfocar */
          focus:ring-blue-300 /* Color del ring */
          focus:border-blue-300 /* Color del borde al enfocar */
          transition-colors   /* Transición suave */
        "
      />

      {/* Contenedor del lado derecho con fecha y botón */}
      <div className="flex items-center gap-4">
        {/* Muestra la fecha */}
        <span
          className="text-sm text-gray-500 whitespace-nowrap"
        >
          {fecha}
        </span>

        {/* Botón para añadir una mesa */}
        <button
          type="button"
          onClick={onAddMesa} // Ejecuta la función pasada como prop
          className="
            bg-blue-100       /* Fondo azul claro */
            text-blue-700     /* Texto azul intenso */
            px-4 py-2         /* Padding interno */
            rounded-md        /* Bordes redondeados */
            text-sm           /* Texto tamaño pequeño */
            font-semibold     /* Texto semi-negrita */
            hover:bg-blue-200 /* Cambio de color al pasar el mouse */
            focus:outline-none /* Quita outline default */
            focus:ring-2       /* Ring al enfocar */
            focus:ring-blue-400 /* Color del ring al enfocar */
            transition        /* Transición suave en hover/focus */
          "
        >
          ➕ Añadir Mesa
        </button>
      </div>
    </header>
  );
}
