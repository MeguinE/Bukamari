// Configuración y constantes del sistema POS Bucamari

export const CONFIG = {
  // Configuración de la aplicación
  APP: {
    NAME: 'POS Bucamari',
    VERSION: '1.0.0',
    DESCRIPTION: 'Sistema POS para Restaurante Bucamari'
  },

  // Configuración del modo demo
  DEMO_MODE: true, // ⚠️ Cambiar a false para producción

  // URLs de la API
  API: {
    BASE_URL: process.env.NODE_ENV === 'production' 
      ? 'https://api.bucamari.com' 
      : 'http://localhost:3001',
    ENDPOINTS: {
      MESAS: '/api/mesas',
      MENU: '/api/menu',
      PEDIDOS: '/api/pedidos',
      TICKETS: '/api/tickets'
    }
  },

  // Configuración de la UI
  UI: {
    ITEMS_PER_PAGE: 10,
    SEARCH_DEBOUNCE_MS: 300,
    NOTIFICATION_TIMEOUT_MS: 3000,
    ANIMATION_DURATION_MS: 200
  },

  // Estados de mesa
  MESA_ESTADOS: {
    LIBRE: 'libre',
    OCUPADA: 'ocupada',
    RESERVADA: 'reservada',
    LIMPIEZA: 'limpieza'
  },

  // Configuración de localStorage
  STORAGE_KEYS: {
    PEDIDOS_PREFIX: 'pedido_',
    USER_PREFERENCES: 'bucamari_preferences',
    LAST_SESSION: 'bucamari_last_session'
  },

  // Configuración del ticket
  TICKET: {
    WIDTH_MM: 50,
    FONT_SIZE: '10px',
    FONT_FAMILY: 'monospace'
  }
};

// Datos del restaurante (debería venir de la API en producción)
export const RESTAURANTE_DATA = {
  nombre: 'Bucamari Restaurante',
  direccion: 'Calle Principal 123, Centro',
  telefono: '+1 (555) 123-4567',
  email: 'info@bucamari.com',
  ruc: '12345678901',
  logo: '/assets/logo.png',
  horarios: {
    lunes_viernes: '11:00 AM - 10:00 PM',
    sabado_domingo: '10:00 AM - 11:00 PM'
  }
};

// Mensajes de error comunes
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet.',
  SERVER_ERROR: 'Error del servidor. Intenta más tarde.',
  NOT_FOUND: 'Recurso no encontrado.',
  VALIDATION_ERROR: 'Datos inválidos. Verifica la información.',
  MESA_EXISTS: 'La mesa ya existe.',
  MESA_NOT_FOUND: 'Mesa no encontrada.',
  PEDIDO_EMPTY: 'No hay productos en el pedido.',
  GENERIC_ERROR: 'Ha ocurrido un error inesperado.'
};

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  MESA_CREATED: 'Mesa creada exitosamente.',
  MESA_UPDATED: 'Mesa actualizada exitosamente.',
  PEDIDO_ADDED: 'Producto agregado al pedido.',
  TICKET_GENERATED: 'Ticket generado exitosamente.',
  DATA_SAVED: 'Datos guardados correctamente.'
};
