// Utilidades y funciones helper para el sistema POS Bucamari

import { CONFIG, ERROR_MESSAGES } from '../config/constants.js';

/**
 * Formatea un precio a moneda local
 * @param {number} precio - El precio a formatear
 * @param {string} moneda - Código de moneda (default: 'USD')
 * @returns {string} Precio formateado
 */
export const formatearPrecio = (precio, moneda = 'USD') => {
  try {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: moneda,
      minimumFractionDigits: 2
    }).format(precio);
  } catch (error) {
    console.warn('Error formateando precio:', error);
    return `$${Number(precio).toFixed(2)}`;
  }
};

/**
 * Formatea una fecha a string legible
 * @param {Date|string} fecha - La fecha a formatear
 * @returns {string} Fecha formateada
 */
export const formatearFecha = (fecha) => {
  try {
    const fechaObj = fecha instanceof Date ? fecha : new Date(fecha);
    return fechaObj.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.warn('Error formateando fecha:', error);
    return 'Fecha inválida';
  }
};

/**
 * Calcula el total de un array de pedidos
 * @param {Array} pedidos - Array de pedidos
 * @returns {number} Total calculado
 */
export const calcularTotal = (pedidos = []) => {
  return pedidos.reduce((total, pedido) => {
    const precio = Number(pedido.precio) || 0;
    const cantidad = Number(pedido.cantidad) || 1;
    return total + (precio * cantidad);
  }, 0);
};

/**
 * Agrupa pedidos por producto para el ticket
 * @param {Array} pedidos - Array de pedidos
 * @returns {Object} Pedidos agrupados
 */
export const agruparPedidos = (pedidos = []) => {
  const agrupados = {};
  
  pedidos.forEach((pedido) => {
    const producto = pedido.producto;
    const precio = Number(pedido.precio) || 0;
    
    if (agrupados[producto]) {
      agrupados[producto].cantidad += 1;
      agrupados[producto].subtotal += precio;
    } else {
      agrupados[producto] = {
        cantidad: 1,
        precioUnitario: precio,
        subtotal: precio
      };
    }
  });
  
  return agrupados;
};

/**
 * Genera un ID único para nuevas mesas
 * @param {Array} mesasExistentes - Array de mesas existentes
 * @returns {string} ID único
 */
export const generarIdMesa = (mesasExistentes = []) => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  let nuevoId = `T${timestamp}${random}`;
  
  // Verificar que no exista
  while (mesasExistentes.some(mesa => mesa.id === nuevoId)) {
    nuevoId = `T${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
  
  return nuevoId;
};

/**
 * Valida los datos de una mesa
 * @param {Object} mesa - Datos de la mesa
 * @returns {Object} Resultado de validación
 */
export const validarMesa = (mesa) => {
  const errores = [];
  
  if (!mesa.id) {
    errores.push('ID de mesa es requerido');
  }
  
  if (typeof mesa.clientes !== 'number' || mesa.clientes < 0) {
    errores.push('Número de clientes debe ser un número positivo');
  }
  
  if (!Array.isArray(mesa.pedidos)) {
    errores.push('Pedidos debe ser un array');
  }
  
  return {
    valido: errores.length === 0,
    errores
  };
};

/**
 * Guarda datos en localStorage de forma segura
 * @param {string} key - Clave de almacenamiento
 * @param {any} data - Datos a guardar
 * @returns {boolean} Éxito de la operación
 */
export const guardarEnStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error guardando en localStorage:', error);
    return false;
  }
};

/**
 * Recupera datos de localStorage de forma segura
 * @param {string} key - Clave de almacenamiento
 * @param {any} defaultValue - Valor por defecto
 * @returns {any} Datos recuperados o valor por defecto
 */
export const obtenerDeStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error leyendo de localStorage:', error);
    return defaultValue;
  }
};

/**
 * Debounce para optimizar búsquedas
 * @param {Function} func - Función a ejecutar
 * @param {number} delay - Delay en milisegundos
 * @returns {Function} Función con debounce
 */
export const debounce = (func, delay = CONFIG.UI.SEARCH_DEBOUNCE_MS) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * Filtra mesas por término de búsqueda
 * @param {Array} mesas - Array de mesas
 * @param {string} termino - Término de búsqueda
 * @returns {Array} Mesas filtradas
 */
export const filtrarMesas = (mesas = [], termino = '') => {
  if (!termino.trim()) return mesas;
  
  const terminoLower = termino.toLowerCase();
  
  return mesas.filter(mesa => {
    return (
      mesa.id.toString().toLowerCase().includes(terminoLower) ||
      mesa.mesero?.toLowerCase().includes(terminoLower) ||
      mesa.estado?.toLowerCase().includes(terminoLower) ||
      mesa.pedidos?.some(pedido => 
        pedido.producto?.toLowerCase().includes(terminoLower)
      )
    );
  });
};

/**
 * Actualiza el estado de una mesa basado en sus pedidos
 * @param {Object} mesa - Datos de la mesa
 * @returns {Object} Mesa con estado actualizado
 */
export const actualizarEstadoMesa = (mesa) => {
  if (!mesa) return mesa;
  
  const tienePedidos = mesa.pedidos && mesa.pedidos.length > 0;
  
  // Si tiene pedidos y está libre, cambiar a ocupada
  if (tienePedidos && mesa.estado === 'libre') {
    return {
      ...mesa,
      estado: 'ocupada'
    };
  }
  
  // Si no tiene pedidos y está ocupada, cambiar a libre
  if (!tienePedidos && mesa.estado === 'ocupada') {
    return {
      ...mesa,
      estado: 'libre'
    };
  }
  
  return mesa;
};

/**
 * Actualiza el estado de una mesa en localStorage
 * @param {string} mesaId - ID de la mesa
 * @param {Array} pedidos - Array de pedidos
 */
export const actualizarEstadoMesaEnStorage = (mesaId, pedidos) => {
  try {
    // Guardar pedidos
    const keyPedidos = `${CONFIG.STORAGE_KEYS.PEDIDOS_PREFIX}${mesaId}`;
    guardarEnStorage(keyPedidos, pedidos);
    
    // Actualizar estado de mesa
    const keyEstado = `mesa_estado_${mesaId}`;
    const nuevoEstado = pedidos.length > 0 ? 'ocupada' : 'libre';
    guardarEnStorage(keyEstado, nuevoEstado);
    
    // Disparar evento personalizado para notificar cambios
    window.dispatchEvent(new CustomEvent('mesaEstadoActualizado', {
      detail: { mesaId, estado: nuevoEstado, pedidos }
    }));
    
  } catch (error) {
    console.error('Error actualizando estado de mesa:', error);
  }
};

/**
 * Obtiene el estado actual de una mesa desde localStorage
 * @param {string} mesaId - ID de la mesa
 * @returns {string} Estado de la mesa
 */
export const obtenerEstadoMesaDeStorage = (mesaId) => {
  const keyEstado = `mesa_estado_${mesaId}`;
  return obtenerDeStorage(keyEstado, 'libre');
};

/**
 * Maneja errores de API de forma consistente
 * @param {Error} error - Error capturado
 * @returns {string} Mensaje de error amigable
 */
export const manejarError = (error) => {
  console.error('Error:', error);
  
  if (!navigator.onLine) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }
  
  if (error.message?.includes('404')) {
    return ERROR_MESSAGES.NOT_FOUND;
  }
  
  if (error.message?.includes('500')) {
    return ERROR_MESSAGES.SERVER_ERROR;
  }
  
  return error.message || ERROR_MESSAGES.GENERIC_ERROR;
};
