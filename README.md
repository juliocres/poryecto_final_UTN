WhatsApp Web Clone (React)
Aplicación web que meula la experiencia de WhatsApp Web, desarrollada en React con foco en manejo de estado global e interactividad en tiempo real.

Funcionalidades Clave
Gestión de Contactos: Crear nuevos contactos, eliminarlos y buscar/filtrar en tiempo real por nombre o último mensaje.

Edición de Nombre en Línea: Modificación directa del nombre del contacto desde la cabecera del chat.

Mensajería Dinámica: Envío, edición y borrado de mensajes (individuales o vaciado completo del chat) con actualización automática de la hora y último mensaje mostrado.

Filtros e Interfaz: Pestañas de navegación (Todos, No leídos, Grupos, Novedades, Comunidades), menú desplegable de opciones por contacto y avatares con color dinámico mediante hashing.

Tecnologías y Arquitectura
React + React Router: Uso de rutas dinámicas (useParams), hooks (useState, useEffect) y navegación por Outlet.

Context API (ContactContext): Estado global centralizado que gestiona en memoria la lista de contactos, los chats seleccionados y la inmutabilidad de los datos.

Componentes Modulares: Separación limpia de la barra lateral (WhatsappSidebar), componentes de chat y formularios (NewContactForm).