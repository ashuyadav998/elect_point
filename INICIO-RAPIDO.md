# ⚡ INICIO RÁPIDO - SimShop

## 🎯 Solo 3 Pasos

### 1️⃣ Backend (Primera Terminal)
```bash
cd backend
npm install
node seed.js
npm start
```
✅ Servidor corriendo en http://localhost:5000

### 2️⃣ Frontend (Segunda Terminal - Abre una nueva)
```bash
cd frontend
npm install
npm start
```
✅ Aplicación en http://localhost:3000

### 3️⃣ Acceder al Admin
1. Ve a: http://localhost:3000/login
2. Email: `admin@simshop.com`
3. Password: `admin123`
4. Ve a: http://localhost:3000/admin

## 🎊 ¡Ya está!

Ahora puedes:
- 🛒 Ver la tienda en http://localhost:3000
- 🎛️ Gestionar todo desde http://localhost:3000/admin

---

## 📝 Notas Importantes

- **MongoDB** debe estar corriendo (instala MongoDB Community si no lo tienes)
- Necesitas **2 terminales abiertas** (una para backend, otra para frontend)
- Las credenciales de admin son: `admin@simshop.com` / `admin123`
- Si `node seed.js` da error, asegúrate que MongoDB esté corriendo

## 🆘 Problemas Comunes

**Error: Cannot connect to MongoDB**
→ Inicia MongoDB (en Windows: MongoDB Compass | en Mac/Linux: `sudo systemctl start mongod`)

**Puerto 3000 ya en uso**
→ Cierra otras apps en ese puerto o usa: `PORT=3001 npm start`

**No veo el panel de admin**
→ Verifica que iniciaste sesión con admin@simshop.com

---

Lee el **README.md** completo para más detalles y configuración avanzada.
