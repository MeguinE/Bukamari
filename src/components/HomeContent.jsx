// Este componente muestra el contenido principal de la vista Home
import { useState, useEffect, useMemo } from 'react';
// @ts-check
/** @typedef {import('../types/index.ts').Mesa} Mesa */
/** @typedef {import('../types/index.ts').Restaurante} Restaurante */
/** @typedef {import('../types/index.ts').TicketData} TicketData */
/**
 * Componente principal que muestra el contenido de la vista Home
 * @param {Object} props
 * @param {Mesa[]} props.mesas - Array de mesas disponibles
 * @param {Function} props.seleccionarMesa - Función para seleccionar una mesa
 * @param {string|number} props.mesaSeleccionada - ID de la mesa seleccionada
 * @param {Mesa} props.mesaActiva - Objeto con los detalles de la mesa activa
 * @param {boolean} props.loading - Estado de carga
 * @param {string|null} props.error - Mensaje de error si existe
 * @param {Function} props.onLimpiarMesa - Función para limpiar pedidos de una mesa
 */
export default function HomeContent({
  mesas,              // Array de mesas disponibles
  seleccionarMesa,    // Función para seleccionar una mesa
  mesaSeleccionada,   // ID de la mesa seleccionada actualmente
  mesaActiva,         // Objeto con los detalles de la mesa activa
  loading,            // Estado de carga
  error,              // Mensaje de error
  onLimpiarMesa       // Función para limpiar pedidos de una mesa
}) {

  // para los estados de los datos del restaurante
  const [restaurante, setRestaurante] = useState(null);

  // Verifica si la mesa activa tiene pedidos
  const tienePedido = mesaActiva?.pedidos?.length > 0;

  // Cálculo optimizado del total de la mesa activa
  const totalMesa = useMemo(() => {
    if (!mesaActiva?.pedidos?.length) return 0;
    return mesaActiva.pedidos.reduce((total, pedido) => {
      return total + (Number(pedido.precio) || 0);
    }, 0);
  }, [mesaActiva?.pedidos]);

  //simulacion de los datos del restaurante
  useEffect(() => {
    const datosRestaurante = {
      nombre: 'Bucamary Restaurante', // Nombre del restaurante
      direccion: 'Calle Falsa 123',
      telefono: '555-1234',
      logo: 'src/assets/logo.png', // Ruta al logo del restaurante
    };
    setTimeout(() => {
      setRestaurante(datosRestaurante);
    }, 1000); // Simula una carga de datos
  }, []);

  // Función que imprime el ticket de pago
  const imprimirTicket = () => {
    if (!restaurante) return;

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

    const items = Object.entries(agrupados);
    const fecha = new Date().toLocaleDateString();
    const hora = new Date().toLocaleTimeString();
    const total = items.reduce((sum, [, i]) => sum + i.subtotal, 0).toFixed(2);

    const contenido = `
<html>
  <head>
    <title>Ticket</title>
    <style>
      @page {
        size: 50mm auto;
        margin: 0;
      }

      html, body {
        margin: 0 !important;
        padding: 0 !important;
        width: 50mm !important;
        font-family: monospace;
        font-size: 10px;
        text-align: center;
      }

      .ticket {
        padding: 0;
        box-sizing: border-box;
        width: 100%;
      }

      .center {
        text-align: center;
        margin: 0 auto;
      }

      .line {
        border-top: 1px dashed #000;
        margin: 5px 0;
      }

      .items, .footer {
        white-space: pre;
        font-family: monospace;
      }

      .total {
        text-align: center;
        font-weight: bold;
        margin-top: 5px;
        white-space: pre;
      }

      
      }

      @media print {
        html, body {
          margin: 0;
          padding: 0;
          width: 50mm;
        }
      }
    </style>
  </head>
  <body>
    <div class="ticket">
      <div class="center">
        <div><strong>Ticket de pago</strong></div>
        <div>${restaurante.nombre}</div>
        <div>${restaurante.direccion}</div>
        <div>Tel: ${restaurante.telefono}</div>
      </div>

      <div class="footer">
Fecha: ${fecha}   Hora: ${hora}
Mesa: ${mesaSeleccionada}
      </div>

      <div class="line"></div>

      <div class="items">
Cant Producto       Subtotal
${items.map(([nombre, info]) => {
      const cant = info.cantidad.toString().padEnd(4, ' ');
      const prod = nombre.length > 12 ? nombre.slice(0, 12) : nombre.padEnd(12, ' ');
      const precio = `$${info.subtotal.toFixed(2)}`.padStart(8, ' ');
      return `${cant}${prod}${precio}`;
    }).join('\n')}
      </div>

      <div class="line"></div>

      <div class="total">
Total: $${total}
      </div>
    </div>
  </body>
</html>
`;

    const ventana = window.open('', '', 'width=800,height=600');
    ventana.document.write(contenido);
    ventana.document.close();
    ventana.focus();
    ventana.print();
    ventana.close();
  }
  // Mostrar estado de carga
  if (loading) {
    return (
      <main className="flex items-center justify-center h-full p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando mesas...</p>
        </div>
      </main>
    );
  }

  // Mostrar estado de error
  if (error) {
    return (
      <main className="flex items-center justify-center h-full p-6">
        <div className="text-center bg-red-50 p-6 rounded-lg border border-red-200">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Reintentar
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="grid grid-cols-4 grid-rows-5 gap-4 w-full h-full p-6">
      {/* ---------------- Zona de mesas ---------------- */}
      <div className="bg-white col-span-3 row-span-4 bg-personalizado rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">MESAS</h2>

        {/* Grid de todas las mesas */}
        <div className="grid grid-cols-3 gap-4">
          {mesas.map((mesa, i) => {
            // Determinar colores según el estado de la mesa
            const getEstadoStyles = (estado) => {
              switch (estado) {
                case 'ocupada':
                  return 'bg-red-100 border-red-300 text-red-800';
                case 'reservada':
                  return 'bg-yellow-100 border-yellow-300 text-yellow-800';
                case 'limpieza':
                  return 'bg-blue-100 border-blue-300 text-blue-800';
                default: // libre
                  return 'bg-green-100 border-green-300 text-green-800';
              }
            };

            const estadoStyles = getEstadoStyles(mesa.estado);
            const isSelected = mesaSeleccionada === mesa.id;

            return (
              <div
                key={mesa.id}
                onClick={() => seleccionarMesa(mesa.id)}
                className={`
                  relative flex flex-col items-center justify-center
                  h-32 w-full rounded-lg shadow-md overflow-hidden
                  cursor-pointer border-2 transition-all duration-200
                  hover:shadow-lg hover:scale-105
                  ${isSelected ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'}
                  ${estadoStyles}
                `}
              >
                {/* Indicador de estado */}
                <div className="absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full bg-white bg-opacity-80">
                  {mesa.estado?.toUpperCase() || 'LIBRE'}
                </div>
                
                {/* Número de la mesa */}
                <div className="text-2xl font-bold mb-1">
                  {mesa.id}
                </div>
                
                {/* Información adicional */}
                <div className="text-xs text-center opacity-80">
                  <div>👥 {mesa.clientes} cliente{mesa.clientes !== 1 ? 's' : ''}</div>
                  {mesa.mesero && <div>👨‍🍳 {mesa.mesero}</div>}
                  {mesa.pedidos?.length > 0 && (
                    <div>🍽️ {mesa.pedidos.length} pedido{mesa.pedidos.length !== 1 ? 's' : ''}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------------- Orden activa (Arriba derecha) ---------------- */}
      <div className="col-start-4 row-start-1 bg-white p-4 rounded-lg shadow-md border">
        <h3 className="text-lg font-bold text-gray-800 mb-3">
          {mesaSeleccionada ? `Mesa ${mesaSeleccionada}` : 'Selecciona una mesa'}
        </h3>
        
        {mesaActiva ? (
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Estado:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                mesaActiva.estado === 'ocupada' ? 'bg-red-100 text-red-800' :
                mesaActiva.estado === 'reservada' ? 'bg-yellow-100 text-yellow-800' :
                mesaActiva.estado === 'limpieza' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {mesaActiva.estado?.toUpperCase() || 'LIBRE'}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-600">👥 Clientes:</span>
              <span className="font-semibold">{mesaActiva.clientes}</span>
            </div>
            
            {mesaActiva.mesero && (
              <div className="flex items-center gap-2">
                <span className="text-gray-600">👨‍🍳 Mesero:</span>
                <span className="font-semibold">{mesaActiva.mesero}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <span className="text-gray-600">🍽️ Pedidos:</span>
              <span className="font-semibold">{mesaActiva.pedidos?.length || 0}</span>
            </div>
            
            {totalMesa > 0 && (
              <div className="pt-2 border-t space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">💰 Total:</span>
                  <span className="font-bold text-green-600">${totalMesa.toFixed(2)}</span>
                </div>
                
                {/* Botón para limpiar mesa */}
                <button
                  onClick={() => onLimpiarMesa && onLimpiarMesa(mesaSeleccionada)}
                  className="w-full text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded hover:bg-orange-200 transition-colors"
                  title="Limpiar pedidos y cambiar mesa a libre"
                >
                  🧹 Limpiar Mesa
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic">
            Haz clic en una mesa para ver sus detalles
          </p>
        )}
      </div>

      {/* ---------------- Productos agregados y botón de ticket ---------------- */}
      <div className="col-start-4 row-start-2 row-span-3 bg-white rounded shadow p-4 flex flex-col justify-between">
        <div className="w-full">
          {tienePedido ? (
            <ul className="text-sm text-gray-700 w-full">
              {mesaActiva.pedidos.map((pedido, index) => (
                <li
                  key={index}
                  className="border-b py-1 flex justify-between"
                >
                  🍽 {pedido.producto} - ${Number(pedido.precio).toFixed(2)}
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
            onClick={imprimirTicket}
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

        {/* Botón para ir al menú */}
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
