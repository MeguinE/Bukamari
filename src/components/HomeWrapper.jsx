import { useState, useEffect, useCallback } from 'react';
import HeaderHome from './HeaderHome';
import HomeContent from './HomeContent';
import { CONFIG, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../config/constants.js';
import { obtenerEstadoMesaDeStorage, obtenerDeStorage } from '../utils/helpers.js';
// @ts-check
/** @typedef {import('../types/index.ts').Mesa} Mesa */
/** @typedef {import('../types/index.ts').Pedido} Pedido */

export default function HomeWrapper() {
  const modoDemo = CONFIG.DEMO_MODE;

  const [fecha, setFecha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mesas, setMesas] = useState([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);

  // Cargar fecha actual
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

  // Función para actualizar estados de mesa dinámicamente
  const actualizarEstadosMesas = useCallback((mesasData) => {
    return mesasData.map(mesa => {
      // Obtener pedidos desde localStorage
      const stored = localStorage.getItem(`pedido_${mesa.id}`);
      const pedidosActuales = stored ? JSON.parse(stored) : mesa.pedidos;
      
      // Obtener estado desde localStorage o calcular automáticamente
      const estadoStorage = obtenerEstadoMesaDeStorage(mesa.id);
      let nuevoEstado = mesa.estado;
      
      // Si hay pedidos y la mesa está libre, cambiar a ocupada
      if (pedidosActuales.length > 0 && (mesa.estado === 'libre' || estadoStorage === 'ocupada')) {
        nuevoEstado = 'ocupada';
      }
      // Si no hay pedidos y la mesa está ocupada, cambiar a libre
      else if (pedidosActuales.length === 0 && mesa.estado === 'ocupada') {
        nuevoEstado = 'libre';
      }
      // Usar estado de storage si existe
      else if (estadoStorage && estadoStorage !== mesa.estado) {
        nuevoEstado = estadoStorage;
      }
      
      return {
        ...mesa,
        pedidos: pedidosActuales,
        estado: nuevoEstado
      };
    });
  }, []);

  // Cargar mesas y fusionar pedidos desde localStorage
  useEffect(() => {
    setLoading(true);
    setError(null);

    const url = modoDemo
      ? '/mesas.json'
      : 'https://tuservidor.com/api/mesas';

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Error en la respuesta del servidor');
        return res.json();
      })
      .then(data => {
        // Actualizar estados dinámicamente
        const mesasActualizadas = actualizarEstadosMesas(data);
        setMesas(mesasActualizadas);
      })
      .catch(err => {
        console.error('Error cargando mesas:', err);
        setError('Error al cargar las mesas. Intenta de nuevo.');
      })
      .finally(() => setLoading(false));
  }, [actualizarEstadosMesas]);

  // Listener para cambios de estado de mesa en tiempo real
  useEffect(() => {
    const handleMesaEstadoActualizado = (event) => {
      const { mesaId, estado, pedidos } = event.detail;
      
      setMesas(prevMesas => 
        prevMesas.map(mesa => 
          mesa.id === mesaId 
            ? { ...mesa, estado, pedidos }
            : mesa
        )
      );
    };

    // Agregar listener para eventos personalizados
    window.addEventListener('mesaEstadoActualizado', handleMesaEstadoActualizado);
    
    // Cleanup
    return () => {
      window.removeEventListener('mesaEstadoActualizado', handleMesaEstadoActualizado);
    };
  }, []);

  const agregarMesa = useCallback(async () => {
    // Generar ID único basado en timestamp para evitar duplicados
    const nuevoId = `T${Date.now()}`;
    const nueva = {
      id: nuevoId,
      pedidos: [],
      clientes: 0,
      estado: 'libre',
      horaApertura: new Date()
    };

    try {
      setLoading(true);
      setError(null);

      if (modoDemo) {
        setMesas(prev => {
          // Verificar que no exista ya una mesa con el mismo ID
          const existe = prev.some(mesa => mesa.id === nuevoId);
          if (existe) {
            throw new Error('Mesa ya existe');
          }
          return [...prev, nueva];
        });
      } else {
        const res = await fetch('https://tuservidor.com/api/mesas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nueva)
        });
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || `Error ${res.status}: ${res.statusText}`);
        }
        const creada = await res.json();
        setMesas(prev => [...prev, creada]);
      }

    } catch (err) {
      console.error('Error al agregar mesa:', err);
      setError(err.message || 'No se pudo crear la mesa. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [modoDemo]);

  const seleccionarMesa = useCallback((id) => {
    setMesaSeleccionada(id);
  }, []);

  const limpiarMesa = useCallback((mesaId) => {
    if (!mesaId) return;
    
    // Confirmar acción
    const confirmar = window.confirm('¿Estás seguro de que quieres limpiar todos los pedidos de esta mesa?');
    if (!confirmar) return;
    
    try {
      // Limpiar pedidos del localStorage
      localStorage.removeItem(`pedido_${mesaId}`);
      localStorage.removeItem(`mesa_estado_${mesaId}`);
      
      // Actualizar estado en el componente
      setMesas(prevMesas => 
        prevMesas.map(mesa => 
          mesa.id === mesaId 
            ? { ...mesa, pedidos: [], estado: 'libre' }
            : mesa
        )
      );
      
      // Disparar evento para notificar cambios
      window.dispatchEvent(new CustomEvent('mesaEstadoActualizado', {
        detail: { mesaId, estado: 'libre', pedidos: [] }
      }));
      
      console.log(`Mesa ${mesaId} limpiada exitosamente`);
      
    } catch (error) {
      console.error('Error limpiando mesa:', error);
      setError('Error al limpiar la mesa. Intenta de nuevo.');
    }
  }, []);

  const mesaActiva = mesas.find(m => m.id === mesaSeleccionada);

  return (
    <>
      <HeaderHome fecha={fecha} onAddMesa={agregarMesa} />
      <HomeContent
        mesas={mesas}
        seleccionarMesa={seleccionarMesa}
        mesaSeleccionada={mesaSeleccionada}
        mesaActiva={mesaActiva}
        loading={loading}
        error={error}
        onLimpiarMesa={limpiarMesa}
      />
    </>
  );
}
