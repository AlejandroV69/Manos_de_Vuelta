<![CDATA[# ❤️‍🩹 Manos de Vuelta

**Conectando manos solidarias en Venezuela.**

Manos de Vuelta es una plataforma web solidaria que permite a personas en Venezuela **solicitar o donar** alimentos, medicinas e insumos médicos dentro de su comunidad. La misión es simple: que nadie se quede sin lo que necesita cuando alguien cerca puede ayudar.

---

## ✨ Funcionalidades

- 🔐 **Autenticación segura** — Registro e inicio de sesión con correo y contraseña (Supabase Auth).
- 📋 **Publicar solicitudes** — Crea una solicitud indicando qué insumo necesitas, la urgencia, tu ubicación y más.
- 💚 **Publicar donaciones** — Ofrece lo que tienes disponible para que alguien más lo aproveche.
- 🔍 **Explorar casos** — Busca publicaciones en tiempo real por título, descripción o categoría.
- 📦 **Mis Publicaciones** — Gestiona tus propias publicaciones: edítalas o elimínalas cuando quieras.
- 📱 **Contacto por WhatsApp** — Cada tarjeta tiene un botón que abre un chat de WhatsApp con un mensaje predefinido para contactar al publicador directamente.
- 📍 **Filtrado por ubicación** — Cada caso muestra el estado y municipio del usuario.
- 📲 **Diseño responsivo** — Funciona perfectamente en escritorio y dispositivos móviles.

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| [React 19](https://react.dev/) | Librería principal del frontend |
| [Vite](https://vite.dev/) | Bundler y servidor de desarrollo |
| [React Router v7](https://reactrouter.com/) | Enrutamiento SPA |
| [Supabase](https://supabase.com/) | Backend: autenticación, base de datos PostgreSQL y API REST |
| [Lucide React](https://lucide.dev/) | Iconos SVG modernos |
| CSS puro | Estilos personalizados sin frameworks CSS |

---

## 🚀 Instalación y uso local

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

Crea un archivo `.env.local` en la raíz del proyecto con tus credenciales de Supabase:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima-aqui
```

4. **Inicia el servidor de desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## 🗃️ Estructura del proyecto

```
Manos_de_Vuelta/
├── public/
│   └── favicon.svg
├── src/
│   ├── features/
│   │   ├── auth/          # Página de login y registro
│   │   ├── dashboard/     # Panel principal (Inicio, Explorar, Mis Publicaciones)
│   │   ├── landing/       # Página de bienvenida
│   │   └── supplies/      # Formulario de insumos
│   ├── services/
│   │   └── supabaseClient.js  # Configuración del cliente Supabase
│   ├── App.jsx            # Rutas y lógica de sesión
│   ├── index.css          # Estilos globales
│   └── main.jsx           # Punto de entrada
├── .env.local             # Variables de entorno (NO se sube a GitHub)
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 🗄️ Base de datos (Supabase)

El proyecto utiliza dos tablas principales en PostgreSQL:

### `profiles`
| Columna | Tipo | Descripción |
|---|---|---|
| `id` | uuid (PK) | ID del usuario (referencia a auth.users) |
| `full_name` | text | Nombre completo |
| `phone_number` | text | Número de teléfono |
| `state` | text | Estado de Venezuela |
| `municipality` | text | Municipio |

### `supplies`
| Columna | Tipo | Descripción |
|---|---|---|
| `id` | int8 (PK) | ID autoincremental |
| `user_id` | uuid (FK) | Referencia al usuario creador |
| `title` | text | Título del insumo |
| `description` | text | Descripción detallada |
| `type` | text | `solicitud` o `donacion` |
| `category` | text | `Medicinas`, `Alimentos`, `Insumos Médicos` u `Otros` |
| `quantity` | text | Cantidad solicitada/ofrecida |
| `urgency` | text | `Alta`, `Media` o `Baja` |
| `state` | text | Estado de Venezuela |
| `municipality` | text | Municipio |
| `is_resolved` | boolean | Si el caso fue resuelto |
| `created_at` | timestamptz | Fecha de creación |

---

## 📸 Capturas de pantalla

> _Próximamente_

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar la plataforma:

1. Haz un fork del proyecto
2. Crea una rama con tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📬 Contacto

¿Tienes alguna duda, sugerencia o quieres colaborar?

[![Instagram](https://img.shields.io/badge/Instagram-@viaana__alejandro-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/viaana_alejandro/)

---

## 📝 Licencia

Este proyecto es de código abierto y fue construido con fines solidarios. Siéntete libre de usarlo, modificarlo y compartirlo.

---

> _Construido con esperanza 🇻🇪_
]]>
