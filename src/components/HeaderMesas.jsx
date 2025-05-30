import { useEffect, useState } from 'react';

export default function MesasHeader() {
  const [fecha, setFecha] = useState('');
  const [mesas, setMesas] = useState(['T1', 'T2', 'T3', 'T4', 'T5', 'T6']);

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

  const agregarMesa = () => {
    const nuevaMesa = `T${mesas.length + 1}`;
    setMesas([...mesas, nuevaMesa]);
  };

  return (
    <>
      {/* Header */}
      <header className="w-full h-16 flex items-center justify-between px-6 bg-white border-b sticky top-0 z-10">
        <input
          type="text"
          placeholder="Buscar producto o cualquier orden..."
          className="w-1/2 px-4 py-2 rounded-md border text-sm"
        />
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 whitespace-nowrap">{fecha}</span>
          <button
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-sm font-semibold"
            onClick={agregarMesa}
          >
            ➕ Añadir Mesa
          </button>
        </div>
      </header>

      {/* Grid de mesas */}
      <main className="grid grid-cols-4 grid-rows-5 gap-4 w-full h-full p-6">
        {/* Zona de mesas */}
        <div className="col-span-3 row-span-4 bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-4">MESAS</h2>
          <div className="grid grid-cols-3 gap-4">
            {mesas.map((mesa, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center text-gray-700 border rounded h-24 bg-gray-50 shadow"
              >
                {mesa}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
