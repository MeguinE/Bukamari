import { useState, useEffect } from 'react';
import HeaderHome from './HeaderHome';
import HomeContent from './HomeContent';

export default function HomeWrapper() {
  const modoDemo = true; // ⚠️ Cambia a false para producción

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
        // 🔸 Aquí fusionamos con localStorage
        const dataConPedidos = data.map(mesa => {
          const stored = localStorage.getItem(`pedido_${mesa.id}`);
          return {
            ...mesa,
            pedidos: stored ? JSON.parse(stored) : mesa.pedidos
          };
        });
        setMesas(dataConPedidos);
      })
      .catch(err => {
        console.error('Error cargando mesas:', err);
        setError('Error al cargar las mesas. Intenta de nuevo.');
      })
      .finally(() => setLoading(false));
  }, []);

  const agregarMesa = async () => {
    const nueva = {
      id: `T${mesas.length + 1}`,
      pedidos: [],
      clientes: 0
    };

    try {
      setLoading(true);
      setError(null);

      if (modoDemo) {
        setMesas(prev => [...prev, nueva]);
      } else {
        const res = await fetch('https://tuservidor.com/api/mesas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nueva)
        });
        if (!res.ok) throw new Error('Error creando la mesa');
        const creada = await res.json();
        setMesas(prev => [...prev, creada]);
      }

    } catch (err) {
      console.error(err);
      setError('No se pudo crear la mesa.');
    } finally {
      setLoading(false);
    }
  };

  const seleccionarMesa = (id) => {
    setMesaSeleccionada(id);
  };

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
      />
    </>
  );
}
