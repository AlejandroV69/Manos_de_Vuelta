# Manos de Vuelta

**Conectando manos solidarias en Venezuela.**

Manos de Vuelta es una plataforma web solidaria que permite a personas en Venezuela **solicitar o donar** alimentos, medicinas e insumos medicos dentro de su comunidad. La mision es simple: que nadie se quede sin lo que necesita cuando alguien cerca puede ayudar.

---

## Funcionalidades

- **Autenticacion segura** - Registro e inicio de sesion con correo y contrasena (Supabase Auth).
- **Publicar solicitudes** - Crea una solicitud indicando que insumo necesitas, la urgencia, tu ubicacion y mas.
- **Publicar donaciones** - Ofrece lo que tienes disponible para que alguien mas lo aproveche.
- **Explorar casos** - Busca publicaciones en tiempo real por titulo, descripcion o categoria.
- **Mis Publicaciones** - Gestiona tus propias publicaciones: editalas o eliminalas cuando quieras.
- **Contacto por WhatsApp** - Cada tarjeta tiene un boton que abre un chat de WhatsApp con un mensaje predefinido para contactar al publicador directamente.
- **Filtrado por ubicacion** - Cada caso muestra el estado y municipio del usuario.
- **Diseno responsivo** - Funciona perfectamente en escritorio y dispositivos moviles.

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| [React 19](https://react.dev/) | Libreria principal del frontend |
| [Vite](https://vite.dev/) | Bundler y servidor de desarrollo |
| [React Router v7](https://reactrouter.com/) | Enrutamiento SPA |
| [Supabase](https://supabase.com/) | Backend: autenticacion, base de datos PostgreSQL y API REST |
| [Lucide React](https://lucide.dev/) | Iconos SVG modernos |
| CSS puro | Estilos personalizados sin frameworks CSS |

---

## Instalacion y uso local

### Prerrequisitos

- [Node.js](https://nodejs.org/) v18 o superior
- Una cuenta en [Supabase](https://supabase.com/) con un proyecto configurado

### Pasos

1. **Clona el repositorio**

```bash
git clone https://github.com/AlejandroV69/Manos_de_Vuelta.git
cd Manos_de_Vuelta
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Configura las variables de entorno**

Crea un archivo `.env.local` en la raiz del proyecto con tus credenciales de Supabase:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima-aqui
```

4. **Inicia el servidor de desarrollo**

```bash
npm run dev
```

La aplicacion estara disponible en `http://localhost:5173`.

---

## Estructura del proyecto

```
Manos_de_Vuelta/
├── public/
│   └── favicon.svg
├── src/
│   ├── features/
│   │   ├── auth/          # Pagina de login y registro
│   │   ├── dashboard/     # Panel principal (Inicio, Explorar, Mis Publicaciones)
│   │   ├── landing/       # Pagina de bienvenida
│   │   └── supplies/      # Formulario de insumos
│   ├── services/
│   │   └── supabaseClient.js  # Configuracion del cliente Supabase
│   ├── App.jsx            # Rutas y logica de sesion
│   ├── index.css          # Estilos globales
│   └── main.jsx           # Punto de entrada
├── .env.local             # Variables de entorno (NO se sube a GitHub)
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## Base de datos (Supabase)

El proyecto utiliza dos tablas principales en PostgreSQL:

### Tabla profiles

| Columna | Tipo | Descripcion |
|---|---|---|
| id | uuid (PK) | ID del usuario (referencia a auth.users) |
| full_name | text | Nombre completo |
| phone_number | text | Numero de telefono |
| state | text | Estado de Venezuela |
| municipality | text | Municipio |

### Tabla supplies

| Columna | Tipo | Descripcion |
|---|---|---|
| id | int8 (PK) | ID autoincremental |
| user_id | uuid (FK) | Referencia al usuario creador |
| title | text | Titulo del insumo |
| description | text | Descripcion detallada |
| type | text | solicitud o donacion |
| category | text | Medicinas, Alimentos, Insumos Medicos u Otros |
| quantity | text | Cantidad solicitada u ofrecida |
| urgency | text | Alta, Media o Baja |
| state | text | Estado de Venezuela |
| municipality | text | Municipio |
| is_resolved | boolean | Si el caso fue resuelto |
| created_at | timestamptz | Fecha de creacion |

---

## Contribuciones

Las contribuciones son bienvenidas! Si tienes ideas para mejorar la plataforma:

1. Haz un fork del proyecto
2. Crea una rama con tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## Contacto

Tienes alguna duda, sugerencia o quieres colaborar?

[![Instagram](https://img.shields.io/badge/Instagram-@viaana__alejandro-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/viaana_alejandro/)

---

## Licencia

Este proyecto es de codigo abierto y fue construido con fines solidarios. Sientete libre de usarlo, modificarlo y compartirlo.

---

> Construido con esperanza
