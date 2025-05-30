import { useState, useEffect } from 'react';
import HeaderHome from './HeaderHome';
import HomeContent from './HomeContent';

export default function HomeWrapper() {
    const [fecha, setFecha] = useState('');
    const [mesas, setMesas] = useState([
        { id: 1, pedidos: [], clientes: 2 },
        { id: 2, pedidos: [], clientes: 4 },
        { id: 3, pedidos: [{ producto: 'Pizza', precio: 20 }], clientes: 1 },
        { id: 4, pedidos: [], clientes: 3 },
    ]);

    const [mesaSeleccionada, setMesaSeleccionada] = useState(null);

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
        const nueva = {
            id: `T${mesas.length + 1}`,
            pedidos: [],
            clientes: 0
        };
        setMesas([...mesas, nueva]);
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
            />
        </>
    );
}
