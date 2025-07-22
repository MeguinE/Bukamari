# 🍽️ Bucamari - Sistema POS para Restaurantes

**Bucamari** es un sistema moderno de punto de venta (POS) diseñado específicamente para restaurantes. Desarrollado con tecnologías web de vanguardia, ofrece una interfaz intuitiva para la gestión de mesas, pedidos y facturación.

![Bucamari POS](https://img.shields.io/badge/Bucamari-POS%20System-orange)
![Astro](https://img.shields.io/badge/Astro-5.8.1-purple)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1.8-cyan)

## ✨ Características Principales

- **🪑 Gestión de Mesas**: Visualización en tiempo real del estado de las mesas (libre, ocupada, reservada, limpieza)
- **📋 Sistema de Pedidos**: Agregar, modificar y gestionar pedidos por mesa
- **🎫 Generación de Tickets**: Impresión automática de tickets de pago
- **👨‍🍳 Asignación de Meseros**: Control de personal por mesa
- **🔍 Búsqueda Inteligente**: Buscar mesas, productos y órdenes
- **📱 Diseño Responsive**: Interfaz adaptable a diferentes dispositivos
- **💾 Persistencia Local**: Datos guardados en localStorage
- **🎨 UI Moderna**: Diseño intuitivo con Tailwind CSS

## 🚀 Estructura del Proyecto

```text
bucamari/
├── public/
│   ├── favicon.svg
│   └── mesas.json              # Datos de mesas (modo demo)
├── src/
│   ├── components/             # Componentes React
│   │   ├── HeaderHome.jsx      # Encabezado principal
│   │   ├── HomeWrapper.jsx     # Contenedor principal
│   │   ├── HomeContent.jsx     # Contenido de mesas
│   │   └── ...
│   ├── config/
│   │   └── constants.js        # Configuración y constantes
│   ├── layouts/
│   │   └── Layout.astro        # Layout principal
│   ├── pages/
│   │   ├── index.astro         # Página principal
│   │   ├── home.astro          # Vista de mesas
│   │   └── menu.astro          # Vista de menú
│   ├── types/
│   │   └── index.ts            # Tipos TypeScript
│   ├── utils/
│   │   └── helpers.js          # Utilidades y helpers
│   └── styles/
│       └── global.css          # Estilos globales
└── package.json
```

## 🛠️ Tecnologías Utilizadas

- **[Astro 5.8.1](https://astro.build/)** - Framework web moderno
- **[React 19.1.0](https://react.dev/)** - Biblioteca para interfaces de usuario
- **[Tailwind CSS 4.1.8](https://tailwindcss.com/)** - Framework de CSS utilitario
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático para JavaScript
- **[React Router DOM](https://reactrouter.com/)** - Enrutamiento para React

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd bucamari
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar el entorno**
   - Edita `src/config/constants.js` para ajustar la configuración
   - En producción, cambia `DEMO_MODE` a `false`

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```
   El servidor se iniciará en `http://localhost:4321`

## 🧞 Comandos Disponibles

| Comando                   | Descripción                                      |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala las dependencias                        |
| `npm run dev`             | Inicia servidor de desarrollo en `localhost:4321` |
| `npm run build`           | Construye la aplicación para producción         |
| `npm run preview`         | Previsualiza la build localmente                |
| `npm run astro ...`       | Ejecuta comandos de Astro CLI                   |
| `npm run astro -- --help` | Ayuda de Astro CLI                              |

## 🚀 Uso del Sistema

### Gestión de Mesas
1. **Ver Estado**: Las mesas se muestran con colores según su estado:
   - 🟢 **Verde**: Mesa libre
   - 🔴 **Rojo**: Mesa ocupada
   - 🟡 **Amarillo**: Mesa reservada
   - 🔵 **Azul**: Mesa en limpieza

2. **Seleccionar Mesa**: Haz clic en cualquier mesa para ver sus detalles

3. **Agregar Mesa**: Usa el botón "➕ Añadir Mesa" en el header

### Sistema de Pedidos
1. **Seleccionar Mesa**: Elige una mesa activa
2. **Ver Pedidos**: Los pedidos aparecen en el panel derecho
3. **Ir al Menú**: Usa "SELECCIONAR Y CONTINUAR" para agregar productos
4. **Generar Ticket**: Haz clic en "Generar ticket de pago"

### Búsqueda
- Usa la barra de búsqueda para encontrar:
  - Mesas por ID
  - Meseros por nombre
  - Productos en pedidos
  - Estados de mesa

## ⚙️ Configuración

### Modo Demo vs Producción

En `src/config/constants.js`:

```javascript
export const CONFIG = {
  DEMO_MODE: true, // Cambiar a false para producción
  API: {
    BASE_URL: 'https://tu-api.com', // URL de tu API
    // ...
  }
};
```

### Datos del Restaurante

Personaliza la información en `src/config/constants.js`:

```javascript
export const RESTAURANTE_DATA = {
  nombre: 'Tu Restaurante',
  direccion: 'Tu Dirección',
  telefono: 'Tu Teléfono',
  // ...
};
```

## 🔧 Personalización

### Agregar Nuevos Estados de Mesa
1. Edita `CONFIG.MESA_ESTADOS` en `constants.js`
2. Actualiza la función `getEstadoStyles()` en `HomeContent.jsx`

### Modificar Estilos
- Edita las clases de Tailwind en los componentes
- Personaliza `src/styles/global.css` para estilos globales

### Integrar con API Real
1. Cambia `DEMO_MODE` a `false`
2. Configura las URLs de API en `constants.js`
3. Implementa la autenticación si es necesaria

## 📱 Responsive Design

El sistema está optimizado para:
- 💻 **Desktop**: Experiencia completa
- 📱 **Tablet**: Interfaz adaptada
- 📱 **Mobile**: Vista simplificada

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Soporte

Para soporte técnico o preguntas:
- 📧 Email: soporte@bucamari.com
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/bucamari/issues)
- 📖 Documentación: [Wiki del proyecto](https://github.com/tu-usuario/bucamari/wiki)

---

**Desarrollado con ❤️ para la industria restaurantera**
