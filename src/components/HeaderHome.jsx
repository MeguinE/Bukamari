// Este componente es el encabezado de la pantalla principal (HeaderHome)
// Recibe dos props:
// - fecha: un string que contiene la fecha a mostrar
// - onAddMesa: una función que se ejecuta cuando el usuario hace clic en "Añadir Mesa"
export default function HeaderHome({ fecha, onAddMesa }) {
  return (
    // Contenedor principal del header
    <header
      className="
        w-full              // Ancho completo
        h-16                // Alto fijo
        flex                // Usa flexbox
        items-center        // Centra verticalmente los elementos
        justify-between     // Espacia los elementos a los extremos
        px-6                // Padding horizontal
        bg-white            // Fondo blanco
        border-b            // Borde inferior
        sticky top-0        // Se queda fijo arriba al hacer scroll
        z-10                // Prioridad en el apilado (sobre otros elementos)
      "
    >
      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar producto o cualquier orden..."
        className="
          w-1/2              // Ocupa la mitad del ancho disponible
          px-4 py-2          // Padding interno
          rounded-md         // Bordes redondeados
          border             // Borde del input
          text-sm            // Texto tamaño pequeño
        "
      />

      {/* Contenedor del lado derecho con fecha y botón */}
      <div className="flex items-center gap-4">
        {/* Muestra la fecha que se pasó como prop */}
        <span className="text-sm text-gray-500 whitespace-nowrap">
          {fecha}
        </span>

        {/* Botón para añadir una mesa */}
        <button
          onClick={onAddMesa} // Ejecuta la función recibida por prop al hacer clic
          className="
            bg-blue-100       // Fondo azul claro
            text-blue-700     // Texto azul más intenso
            px-4 py-2         // Padding interno
            rounded-md        // Bordes redondeados
            text-sm           // Texto tamaño pequeño
            font-semibold     // Texto semi-negrita
          "
        >
          ➕ Añadir Mesa
        </button>
      </div>
    </header>
  );
}
