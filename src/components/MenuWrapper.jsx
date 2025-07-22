import { useState, useEffect } from "react";
import MenuView from "./MenuView.jsx";
import { actualizarEstadoMesaEnStorage } from '../utils/helpers.js';

export default function MenuWrapper() {
  const [mesaId, setMesaId] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mesaInfo, setMesaInfo] = useState(null); // Por si quieres ver info de clientes

  // 1. Leer id de la URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    setMesaId(id);
  }, []);

  // 2. Cargar productos y pedidos de la mesa
  useEffect(() => {
    if (!mesaId) return;

    async function loadData() {
      setLoading(true);
      try {
        // Productos del menú
        setProductos([
          {
            name: "Taco",
            price: 15,
            image: "src/assets/tacos.webp",
          },
          {
            name: "Sopa",
            price: 20,
            image: "https://via.placeholder.com/300x200?text=Sopa",
          },
          {
            name: "Refresco",
            price: 10,
            image: "https://via.placeholder.com/300x200?text=Refresco",
          },
        ]);

        // Cargar las mesas
        const res = await fetch("/mesas.json");
        const mesas = await res.json();

        const mesaData = mesas.find((m) => String(m.id) === String(mesaId));
        setMesaInfo(mesaData ?? null);

        // LEER LOCAL STORE primero
        const store = localStorage.getItem(`pedido_${mesaId}`);

        if (store) {
          setPedidos(JSON.parse(store));
        } else {
          setPedidos(mesaData?.pedidos || []);
        }
      } catch (err) {
        console.error("Error cargando datos:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [mesaId]);


  if (loading || !mesaId) {
    return <div className="p-4">Cargando menú de mesa...</div>;
  }

  return (
    <MenuView
      mesaId={mesaId}
      mesaInfo={mesaInfo}
      productos={productos}
      pedidos={pedidos}
      agregarProducto={(producto) => {
        //transformar el objeto
        const nuevoItem = {
          producto: producto.name,
          precio: producto.price
        };
        const nuevoPedido = [...pedidos, nuevoItem];
        setPedidos(nuevoPedido);
        
        // Actualizar estado de mesa automáticamente
        actualizarEstadoMesaEnStorage(mesaId, nuevoPedido);
      }}
      finalizarPedido={() => {
        console.log(`Pedido finalizado mesa ${mesaId}:`, pedidos);
        
        // Opción 1: Mantener pedidos (mesa sigue ocupada)
        // No hacer nada, los pedidos se mantienen
        
        // Opción 2: Limpiar pedidos (mesa vuelve a libre)
        // Descomenta las siguientes líneas si quieres limpiar:
        // const pedidosVacios = [];
        // setPedidos(pedidosVacios);
        // actualizarEstadoMesaEnStorage(mesaId, pedidosVacios);
        
        // Por defecto, mantener los pedidos para que la mesa siga ocupada
        // El usuario puede limpiar manualmente desde la vista principal
        
        // Navegar de vuelta al home
        window.location.href = "/";
      }}
    />
  );
}