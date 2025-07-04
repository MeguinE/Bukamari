// Este componente muestra el contenido principal de la vista Home
export default function HomeContent({
    mesas,
    seleccionarMesa,
    mesaSeleccionada,
    mesaActiva
}) {


    // Verifica si la mesa activa tiene pedidos
    const tienePedido = mesaActiva?.pedidos?.length > 0;
    const imprimirTicket = () => {
        // 1. Agrupar productos por nombre
        const agrupados = {};
        mesaActiva.pedidos.forEach((p) => {
            if (agrupados[p.producto]) {
                agrupados[p.producto].cantidad += 1;
                agrupados[p.producto].subtotal += Number(p.precio);
            } else {
                agrupados[p.producto] = {
                    cantidad: 1,
                    precioUnitario: Number(p.precio),
                    subtotal: Number(p.precio),
                };
            }
        });

        // 2. Convertir en array
        const items = Object.entries(agrupados);

        // 3. Construir el HTML del ticket
        const contenido = `
    <html>
      <head>
        <title>Ticket de pago - Mesa ${mesaSeleccionada}</title>
        <style>
          body { font-family: sans-serif; padding: 20px; }
          h2 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border-bottom: 1px dashed #ccc; padding: 4px; text-align: left; }
          .total { font-weight: bold; margin-top: 10px; }
        </style>
      </head>
      <body>
        <h2>Ticket de pago</h2>
        <p>Mesa: ${mesaSeleccionada}</p>
        <table>
          <thead>
            <tr>
              <th>Cant.</th>
              <th>Producto</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${items
                .map(
                    ([nombre, info]) =>
                        `<tr>
                    <td>${info.cantidad}</td>
                    <td>${nombre}</td>
                    <td>$${info.subtotal}</td>
                  </tr>`
                )
                .join('')}
          </tbody>
        </table>
        <p class="total">
          Total: $${items.reduce((sum, [, i]) => sum + i.subtotal, 0)}
        </p>
      </body>
    </html>
  `;

        // 4. Abrir ventana e imprimir
        const ventana = window.open('', '_blank', 'width=400,height=600');
        ventana.document.write(contenido);
        ventana.document.close();
        ventana.focus();
        ventana.print();
        ventana.close();
    };

    return (
        <main className="grid grid-cols-4 grid-rows-5 gap-4 w-full h-full p-6">
            {/* ---------------- Zona de mesas ---------------- */}
            <div className="bg-white col-span-3 row-span-4 bg-personalizado rounded shadow p-4">
                <h2 className="text-xl font-semibold mb-4">MESAS</h2>

                {/* Grid con todas las mesas */}
                <div className="grid grid-cols-3 gap-4">
                    {mesas.map((mesa, i) => (
                        <div
                            key={i}
                            onClick={() => seleccionarMesa(mesa.id)}
                            className={`
                relative flex items-center justify-center
                h-32 w-full rounded bg-personalizado shadow overflow-hidden
                cursor-pointer border-2 transition-all
                ${mesaSeleccionada === mesa.id ? 'border-orange-500' : 'border-transparent'}
              `}
                        >
                            {/* Imagen de la mesa */}
                            <img
                                src="src/assets/mesa-redonda.webp"
                                alt={`Mesa ${mesa.id}`}
                                className="absolute inset-0 w-full h-full object-contain opacity-70 animate-tada"
                            />
                            {/* Número de la mesa */}
                            <span className="z-10 text-lg font-semibold text-gray-800">
                                Mesa {mesa.id}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ---------------- Orden activa (Arriba a la derecha) ---------------- */}
            <div className="col-start-4 row-start-1 bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold">
                    ORDEN {mesaSeleccionada ? `#${mesaSeleccionada}` : ''}
                </h3>
                <p>
                    👤 Cliente: {mesaActiva ? mesaActiva.clientes : '—'}
                </p>
                <p>
                    🪑 Mesa: {mesaSeleccionada ?? '—'}
                </p>
            </div>

            {/* ---------------- Productos agregados y botón de ticket ---------------- */}
            <div className="col-start-4 row-start-2 row-span-3 bg-white rounded shadow p-4 flex flex-col justify-between">
                <div className="w-full">
                    {tienePedido ? (
                        <ul className="text-sm text-gray-700 w-full">
                            {mesaActiva.pedidos.map((pedido, index) => (
                                <li key={index} className="border-b py-1 flex justify-between">
                                    🍽 {pedido.producto} - ${pedido.precio}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <>
                            <img
                                src="src/assets/comida.webp"
                                alt="Sin pedidos"
                                className="w-32 h-32 mb-4 object-contain opacity-80 mx-auto"
                            />
                            <p className="text-center text-sm text-gray-500">
                                No hay productos agregados
                            </p>
                        </>
                    )}
                </div>

                {tienePedido && (
                    <button
                        onClick={() => imprimirTicket()}
                        className="w-full mt-4 bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition"
                    >
                        Generar ticket de pago
                    </button>
                )}
            </div>

            {/* ---------------- Footer con resumen y botón ---------------- */}
            <div className="col-span-4 row-start-5 flex justify-between items-center p-4 bg-white rounded shadow">
                <div className="flex items-center gap-4 text-sm">
                    <span>
                        🪑 Mesa:{' '}
                        <span className="text-orange-600 font-bold">
                            {mesaSeleccionada ?? '—'}
                        </span>
                    </span>
                    <span>
                        👥 Clientes:{' '}
                        <span className="text-orange-600 font-bold">
                            {mesaActiva?.clientes ?? '—'}
                        </span>
                    </span>
                </div>

                <a
                    href={`/menu?id=${mesaSeleccionada ?? ''}`}
                    className={`bg-green-800 text-white px-6 py-2 rounded-md font-semibold ${!mesaSeleccionada ? 'pointer-events-none opacity-50' : ''
                        }`}
                >
                    SELECCIONAR Y CONTINUAR
                </a>
            </div>
        </main>
    );
}
