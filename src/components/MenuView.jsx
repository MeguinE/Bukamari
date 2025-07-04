// Componente principal que representa el menú de productos para una mesa
export default function MenuView({
  mesaId,            // Id de la mesa seleccionada (ej. "T1")
  productos,         // Lista de productos disponibles para agregar
  agregarProducto,   // Función que se ejecuta al agregar un producto al pedido
  pedidos,           // Lista de productos que ya se han agregado al pedido
  finalizarPedido,    // Función que se ejecuta al finalizar el pedido          // Texto de búsqueda (no se usa en este componente, pero puede ser útil para filtrar productos)
}) {
 
  return (
    <main className="grid grid-cols-4 gap-4 w-full h-full p-6">

      {/* Zona izquierda: listado de productos disponibles */}
      <div className="col-span-3 bg-white rounded shadow p-4 overflow-y-auto">
        {/* Título */}
        <h2 className="text-xl font-semibold mb-4">
          Menú - Mesa {mesaId}
        </h2>

        {/* Grilla de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-100 rounded-lg shadow overflow-hidden"
            >
              {/* Imagen del producto */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover"
              />

              {/* Información del producto y botón agregar */}
              <div className="p-4 flex flex-col justify-between h-40">
                <div>
                  <h3 className="text-md font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-700">${item.price}</p>
                </div>

                <button
                  onClick={() => agregarProducto(item)}
                  className="bg-green-700 text-white mt-2 py-2 rounded font-semibold hover:bg-green-800 transition"
                >
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Barra lateral derecha: resumen del pedido actual */}
      <div className="col-span-1 bg-white rounded shadow p-4 flex flex-col justify-between">
        <div>
          {/* Información de la mesa */}
          <h3 className="text-lg font-bold mb-2">🪑 Mesa {mesaId}</h3>
          <h4 className="text-md font-semibold mb-2">🧾 Pedido actual</h4>

          {/* Lista de productos agregados */}
          {pedidos.length > 0 ? (
            <ul className="text-sm text-gray-700 space-y-2">
              {pedidos.map((p, i) => (
                <li
                  key={i}
                  className="flex justify-between border-b pb-1"
                >
                  <span>
                    {p.name ?? p.producto}
                  </span>
                  <span>
                    ${p.price ?? p.precio}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            // Mensaje cuando no hay productos agregados
            <p className="text-gray-500 text-sm">
              No hay productos seleccionados.
            </p>
          )}
        </div>
        {/* Botón para finalizar el pedido */}
        <button
          onClick={finalizarPedido}
          disabled={pedidos.length === 0}
          className="bg-blue-600 text-white mt-4 py-2 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Finalizar pedido
        </button>
      </div>
    </main>
  );
}
