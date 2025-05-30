export default function HeaderHome({ fecha, onAddMesa }) {
  return (
    <header className="w-full h-16 flex items-center justify-between px-6 bg-white border-b sticky top-0 z-10">
      <input
        type="text"
        placeholder="Buscar producto o cualquier orden..."
        className="w-1/2 px-4 py-2 rounded-md border text-sm"
      />
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 whitespace-nowrap">{fecha}</span>
        <button
          onClick={onAddMesa}
          className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-sm font-semibold"
        >
          ➕ Añadir Mesa
        </button>
      </div>
    </header>
  );
}
