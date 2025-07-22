// Tipos para el sistema POS Bucamari

export interface Pedido {
  id?: string;
  producto: string;
  precio: number;
  cantidad?: number;
  notas?: string;
  timestamp?: Date;
}

export interface Mesa {
  id: string | number;
  pedidos: Pedido[];
  clientes: number;
  estado?: 'libre' | 'ocupada' | 'reservada' | 'limpieza';
  mesero?: string;
  horaApertura?: Date;
}

export interface Restaurante {
  nombre: string;
  direccion: string;
  telefono: string;
  logo?: string;
  ruc?: string;
  email?: string;
}

export interface ProductoMenu {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion?: string;
  imagen?: string;
  disponible: boolean;
  ingredientes?: string[];
}

export interface Categoria {
  id: string;
  nombre: string;
  descripcion?: string;
  icono?: string;
  orden: number;
}

export interface TicketData {
  mesa: Mesa;
  restaurante: Restaurante;
  fecha: string;
  hora: string;
  total: number;
  items: Array<{
    producto: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
  }>;
}
