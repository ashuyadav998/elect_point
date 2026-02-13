const mongoose = require('mongoose');
require('dotenv').config();
const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');

const categories = [
  { name: 'SIM Prepago', slug: 'sim-prepago', description: 'Tarjetas SIM prepago para todos los operadores' },
  { name: 'Telefonía y Smartwatch', slug: 'telefonia-smartwatch', description: 'Smartphones y smartwatches de última generación' },
  { name: 'Accesorios Móviles', slug: 'accesorios-moviles', description: 'Fundas, protectores, cargadores y más' },
  { name: 'Electrodomésticos y Hogar', slug: 'electrodomesticos-hogar', description: 'Electrodomésticos para tu hogar' },
  { name: 'Alimentación', slug: 'alimentacion', description: 'Productos de alimentación' },
  { name: 'Memorias', slug: 'memorias', description: 'Memorias USB, tarjetas SD y más' },
  { name: 'Informática y Gaming', slug: 'informatica-gaming', description: 'Ordenadores, periféricos y gaming' },
  { name: 'Pilas', slug: 'pilas', description: 'Pilas y baterías de todo tipo' },
  { name: 'Zona Fumador', slug: 'zona-fumador', description: 'Productos para fumadores' },
  { name: 'Material de Oficina', slug: 'material-oficina', description: 'Todo para tu oficina' }
];

const sampleProducts = async (categoryMap) => [
  {
    name: 'SIM Prepago Vodafone 10GB',
    slug: 'sim-vodafone-10gb',
    description: 'Tarjeta SIM prepago con 10GB de datos y llamadas ilimitadas',
    price: 15.99,
    originalPrice: 19.99,
    discount: 20,
    category: categoryMap['sim-prepago'],
    images: ['https://picsum.photos/400/400?random=1'],
    stock: 100,
    sku: 'SIM-VOD-10GB',
    brand: 'Vodafone',
    isOffer: true
  },
  {
    name: 'iPhone 15 Pro 256GB',
    slug: 'iphone-15-pro-256gb',
    description: 'iPhone 15 Pro con chip A17 Pro, pantalla de 6.1 pulgadas y cámara profesional',
    price: 1199,
    category: categoryMap['telefonia-smartwatch'],
    images: ['https://picsum.photos/400/400?random=2'],
    stock: 25,
    sku: 'IPHONE-15-PRO-256',
    brand: 'Apple',
    isFeatured: true
  },
  {
    name: 'Samsung Galaxy Watch 6',
    slug: 'galaxy-watch-6',
    description: 'Smartwatch con monitorización de salud avanzada y GPS',
    price: 299,
    originalPrice: 349,
    discount: 14,
    category: categoryMap['telefonia-smartwatch'],
    images: ['https://picsum.photos/400/400?random=3'],
    stock: 50,
    sku: 'WATCH-SAMSUNG-6',
    brand: 'Samsung',
    isOffer: true
  },
  {
    name: 'Funda iPhone Silicona',
    slug: 'funda-iphone-silicona',
    description: 'Funda de silicona premium para iPhone, disponible en varios colores',
    price: 19.99,
    category: categoryMap['accesorios-moviles'],
    images: ['https://picsum.photos/400/400?random=4'],
    stock: 200,
    sku: 'FUNDA-IP-SIL',
    brand: 'Apple'
  },
  {
    name: 'Cargador Rápido 65W',
    slug: 'cargador-rapido-65w',
    description: 'Cargador USB-C de carga rápida 65W, compatible con múltiples dispositivos',
    price: 29.99,
    category: categoryMap['accesorios-moviles'],
    images: ['https://picsum.photos/400/400?random=5'],
    stock: 150,
    sku: 'CARG-65W'
  },
  {
    name: 'Memoria USB 128GB',
    slug: 'usb-128gb',
    description: 'Memoria USB 3.0 de alta velocidad con 128GB de capacidad',
    price: 24.99,
    originalPrice: 34.99,
    discount: 29,
    category: categoryMap['memorias'],
    images: ['https://picsum.photos/400/400?random=6'],
    stock: 300,
    sku: 'USB-128GB',
    brand: 'SanDisk',
    isOffer: true
  },
  {
    name: 'Teclado Gaming RGB',
    slug: 'teclado-gaming-rgb',
    description: 'Teclado mecánico gaming con iluminación RGB personalizable',
    price: 89.99,
    category: categoryMap['informatica-gaming'],
    images: ['https://picsum.photos/400/400?random=7'],
    stock: 75,
    sku: 'TEC-GAME-RGB',
    brand: 'Razer',
    isFeatured: true
  },
  {
    name: 'Pilas AA Alcalinas Pack 12',
    slug: 'pilas-aa-pack12',
    description: 'Pack de 12 pilas alcalinas AA de larga duración',
    price: 9.99,
    category: categoryMap['pilas'],
    images: ['https://picsum.photos/400/400?random=8'],
    stock: 500,
    sku: 'PILAS-AA-12'
  }
];

async function initializeData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Limpiar datos existentes
    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Datos anteriores eliminados');

    // Crear usuario administrador
    const adminUser = new User({
      name: 'Administrador',
      email: 'admin@simshop.com',
      password: 'admin123', // Se hasheará automáticamente
      role: 'admin',
      active: true
    });
    await adminUser.save();
    console.log('✅ Usuario administrador creado');
    console.log('📧 Email: admin@simshop.com');
    console.log('🔑 Password: admin123');

    // Insertar categorías
    const insertedCategories = await Category.insertMany(categories);
    console.log(`✅ ${insertedCategories.length} categorías creadas`);

    // Crear mapa de categorías
    const categoryMap = {};
    insertedCategories.forEach(cat => {
      categoryMap[cat.slug] = cat._id;
    });

    // Insertar productos
    const products = await sampleProducts(categoryMap);
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ ${insertedProducts.length} productos creados`);

    console.log('\n🎉 Inicialización completada con éxito!');
    console.log('\n📝 Credenciales de acceso al panel de administración:');
    console.log('   Email: admin@simshop.com');
    console.log('   Password: admin123');
    console.log('\n🔗 Accede al panel: http://localhost:3000/admin\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error durante la inicialización:', error);
    process.exit(1);
  }
}

initializeData();
