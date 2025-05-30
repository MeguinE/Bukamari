export default function HomeContent({ mesas, seleccionarMesa, mesaSeleccionada, mesaActiva }) {
    const tienePedido = mesaActiva?.pedidos?.length > 0;

    return (
        <main className="grid grid-cols-4 grid-rows-5 gap-4 w-full h-full p-6">
            {/* Zona de mesas */}
            <div className="col-span-3 row-span-4 bg-white rounded shadow p-4">
                <h2 className="text-xl font-semibold mb-4">MESAS</h2>
                <div className="grid grid-cols-3 gap-4">
                    {mesas.map((mesa, i) => (
                        <div
                            key={i}
                            onClick={() => seleccionarMesa(mesa.id)}
                            className={`relative flex items-center justify-center h-32 w-full rounded bg-gray-200 shadow overflow-hidden cursor-pointer border-2 transition-all ${mesaSeleccionada === mesa.id ? 'border-orange-500' : 'border-transparent'
                                }`}
                        >
                            <img
                                src="src/assets/mesa-redonda.webp"
                                alt={`Mesa ${mesa.id}`}
                                className="absolute inset-0 w-full h-full object-contain opacity-70"
                            />
                            <span className="z-10 text-lg font-semibold text-gray-800">Mesa {mesa.id}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Orden activa */}
            <div className="col-start-4 row-start-1 bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold">ORDEN {mesaSeleccionada ? `#${mesaSeleccionada}` : ''}</h3>
                <p>👤 Cliente: {mesaActiva ? mesaActiva.clientes : '—'}</p>
                <p>🪑 Mesa: {mesaSeleccionada ?? '—'}</p>
            </div>

            {/* Productos agregados (zona media derecha) */}
            <div className="col-start-4 row-start-2 row-span-3 bg-white rounded shadow p-4 flex flex-col items-center justify-center text-gray-400">
                {mesaActiva && mesaActiva.pedidos?.length > 0 ? (
                    <ul className="text-sm text-gray-700 w-full">
                        {mesaActiva.pedidos.map((pedido, index) => (
                            <li key={index} className="border-b py-1">
                                🍽 {pedido.producto} - ${pedido.precio}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <>
                        <img
                            src="src/assets/comida.webp"
                            alt="Sin pedidos"
                            className="w-32 h-32 mb-4 object-contain opacity-80"
                        />
                        <p className="text-center text-sm text-gray-500">No hay productos agregados</p>
                    </>
                )}
            </div>



            {/* Footer con resumen */}
            <div className="col-span-4 row-start-5 flex justify-between items-center p-4 bg-white rounded shadow">
                <div className="flex items-center gap-4 text-sm">
                    <span>🪑 Mesa: <span className="text-orange-600 font-bold">{mesaSeleccionada ?? '—'}</span></span>
                    <span>👥 Clientes: <span className="text-orange-600 font-bold">{mesaActiva?.clientes ?? '—'}</span></span>
                </div>
                <button
                    disabled={!mesaSeleccionada}
                    className="bg-green-800 text-white px-6 py-2 rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    SELECCIONAR Y CONTINUAR
                </button>
            </div>
        </main>
    );
}
