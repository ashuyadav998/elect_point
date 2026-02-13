# 🛒 SimShop - Ecommerce Completo con Dashboard de Administración

Aplicación de ecommerce completa para vender tarjetas SIM y productos electrónicos, con panel de administración integrado.

## 📦 ¿Qué incluye?

### 🌐 **Tienda Online (Frontend)**
- Catálogo de productos
- 10 Categorías configuradas
- Carrito de compras
- Sistema de registro y login
- Proceso de checkout
- Búsqueda y filtros
- Ofertas y descuentos

### 🎛️ **Panel de Administración**
- Dashboard con estadísticas
- Gestión de productos (crear, editar, eliminar)
- Gestión de categorías
- Gestión de pedidos
- Gestión de usuarios
- Control de stock
- Actualización de estados

### ⚙️ **Backend (API)**
- API REST completa
- Base de datos MongoDB
- Autenticación JWT
- Modelos de datos
- Datos de ejemplo incluidos

## 🚀 Instalación y Uso

### Paso 1: Requisitos Previos

Necesitas tener instalado:
- **Node.js** (v14 o superior) - [Descargar aquí](https://nodejs.org/)
- **MongoDB** (local o MongoDB Atlas) - [Descargar aquí](https://www.mongodb.com/try/download/community)

### Paso 2: Configurar el Backend

```bash
# 1. Ir a la carpeta backend
cd backend

# 2. Instalar dependencias
npm install

# 3. Crear datos de ejemplo y usuario administrador
node seed.js

# 4. Iniciar el servidor
npm start
```

El servidor estará corriendo en: **http://localhost:5000**

### Paso 3: Configurar el Frontend

Abre una **nueva terminal** (deja el backend corriendo):

```bash
# 1. Ir a la carpeta frontend
cd frontend

# 2. Instalar dependencias
npm install

# 3. Iniciar la aplicación
npm start
```

La aplicación se abrirá automáticamente en: **http://localhost:3000**

## 🔐 Acceso al Panel de Administración

### Credenciales de Admin:
- **Email:** `admin@simshop.com`
- **Contraseña:** `admin123`

### Pasos para acceder:
1. Ve a **http://localhost:3000/login**
2. Ingresa las credenciales de arriba
3. Una vez dentro, ve a **http://localhost:3000/admin**

## 📂 Estructura del Proyecto

```
simshop-completo/
│
├── backend/                    # Servidor API
│   ├── models/                 # Modelos de base de datos
│   │   ├── Category.js
│   │   ├── Product.js
│   │   ├── User.js
│   │   └── Order.js
│   ├── routes/                 # Rutas de la API
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── auth.js
│   │   ├── orders.js
│   │   └── users.js
│   ├── .env                    # Configuración
│   ├── server.js               # Servidor principal
│   ├── seed.js                 # Datos de ejemplo
│   └── package.json
│
└── frontend/                   # Aplicación React
    ├── public/
    │   └── index.html
    └── src/
        ├── components/         # Componentes reutilizables
        │   ├── Header.js
        │   ├── Footer.js
        │   ├── ProductCard.js
        │   ├── AdminRoute.js
        │   └── admin/
        │       └── AdminLayout.js
        ├── pages/              # Páginas
        │   ├── Home.js
        │   ├── Products.js
        │   ├── ProductDetail.js
        │   ├── Cart.js
        │   ├── Checkout.js
        │   ├── Login.js
        │   ├── Register.js
        │   └── admin/
        │       ├── AdminDashboard.js
        │       ├── AdminProducts.js
        │       ├── AdminCategories.js
        │       ├── AdminOrders.js
        │       └── AdminUsers.js
        ├── context/            # Estados globales
        │   ├── CartContext.js
        │   └── AuthContext.js
        ├── services/           # Servicios API
        │   └── api.js
        ├── styles/             # Estilos CSS
        ├── App.js
        ├── index.js
        └── package.json
```

## 🎯 Categorías Disponibles

1. **SIM Prepago** - Tarjetas SIM prepago
2. **Telefonía y Smartwatch** - Smartphones y smartwatches
3. **Accesorios Móviles** - Fundas, cargadores, protectores
4. **Electrodomésticos y Hogar** - Productos para el hogar
5. **Alimentación** - Productos alimenticios
6. **Memorias** - USB, tarjetas SD
7. **Informática y Gaming** - Ordenadores, periféricos
8. **Pilas** - Pilas y baterías
9. **Zona Fumador** - Productos para fumadores
10. **Material de Oficina** - Productos de oficina

## 🛠️ Uso del Panel de Administración

### Dashboard Principal
- Ve las estadísticas generales
- Productos totales y stock bajo
- Pedidos pendientes
- Ingresos totales

### Gestionar Productos
1. Ir a **Admin > Productos**
2. Clic en **"Nuevo Producto"**
3. Llenar el formulario
4. Guardar

### Gestionar Pedidos
1. Ir a **Admin > Pedidos**
2. Clic en el ícono del ojo para ver detalles
3. Actualizar estado del pedido o pago

### Gestionar Categorías
1. Ir a **Admin > Categorías**
2. Clic en **"Nueva Categoría"**
3. Completar información
4. Guardar

## ⚙️ Configuración Avanzada

### Cambiar Puerto del Backend

Edita `backend/.env`:
```env
PORT=5000  # Cambia a otro puerto si lo necesitas
```

### Usar MongoDB Atlas (base de datos en la nube)

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito
3. Obtén la URL de conexión
4. Edita `backend/.env`:
```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/simshop
```

### Cambiar Credenciales de Admin

Edita `backend/seed.js` antes de ejecutarlo:
```javascript
const adminUser = new User({
  name: 'Tu Nombre',
  email: 'tu@email.com',
  password: 'tu_password',
  role: 'admin'
});
```

## 🔒 Seguridad

⚠️ **IMPORTANTE ANTES DE PRODUCCIÓN:**

1. **Cambiar la contraseña del admin**
2. **Cambiar JWT_SECRET** en `backend/.env`
3. **Habilitar HTTPS**
4. **Configurar CORS** correctamente
5. **Añadir rate limiting**
6. **Validar todos los inputs**

## 📱 Rutas de la Aplicación

### Tienda (Público)
- `/` - Página principal
- `/productos` - Lista de productos
- `/productos/:slug` - Detalle de producto
- `/categoria/:slug` - Productos por categoría
- `/carrito` - Carrito de compras
- `/checkout` - Finalizar compra
- `/login` - Iniciar sesión
- `/registro` - Crear cuenta

### Admin (Solo Administradores)
- `/admin` - Dashboard
- `/admin/productos` - Gestión de productos
- `/admin/categorias` - Gestión de categorías
- `/admin/pedidos` - Gestión de pedidos
- `/admin/usuarios` - Gestión de usuarios

## 🐛 Solución de Problemas

### El backend no inicia
```bash
# Verifica que MongoDB esté corriendo
# En Windows: inicia el servicio de MongoDB
# En Mac/Linux:
sudo systemctl start mongod
```

### Error "Cannot find module"
```bash
# Reinstala las dependencias
cd backend
rm -rf node_modules
npm install

cd ../frontend
rm -rf node_modules
npm install
```

### No puedo acceder al admin
1. Verifica que ejecutaste `node seed.js`
2. Usa las credenciales correctas: `admin@simshop.com` / `admin123`
3. Asegúrate de estar en `/admin` después de login

### La página no carga
```bash
# Verifica que ambos servidores estén corriendo:
# Terminal 1: backend (puerto 5000)
# Terminal 2: frontend (puerto 3000)
```

## 📊 API Endpoints

### Productos
- `GET /api/products` - Listar productos
- `GET /api/products/:id` - Ver producto
- `POST /api/products` - Crear producto (admin)
- `PUT /api/products/:id` - Actualizar producto (admin)
- `DELETE /api/products/:id` - Eliminar producto (admin)

### Categorías
- `GET /api/categories` - Listar categorías
- `POST /api/categories` - Crear categoría (admin)

### Pedidos
- `GET /api/orders` - Listar pedidos (admin)
- `POST /api/orders` - Crear pedido
- `PUT /api/orders/:id/status` - Actualizar estado (admin)

### Usuarios
- `POST /api/auth/register` - Registrarse
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/users` - Listar usuarios (admin)

## 💡 Consejos de Uso

1. **Ejecuta seed.js** cada vez que quieras resetear los datos
2. **El carrito se guarda** en localStorage (se mantiene al cerrar el navegador)
3. **Las imágenes** se manejan por URL (usa servicios como Imgur o Cloudinary)
4. **Los usuarios normales** no pueden acceder a `/admin`

## 📞 Ayuda

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Revisa los logs del servidor backend
3. Asegúrate de que MongoDB esté corriendo
4. Verifica que los puertos 3000 y 5000 estén disponibles

## 🎉 ¡Listo para Usar!

El proyecto está completamente funcional y listo para:
- ✅ Desarrollar
- ✅ Personalizar
- ✅ Agregar más funciones
- ✅ Desplegar en producción

---

**¿Preguntas?** Todo el código está comentado y organizado. ¡Explora y personaliza! 🚀
