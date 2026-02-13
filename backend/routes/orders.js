const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Crear pedido
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    await order.populate('items.product user');
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear pedido', error: error.message });
  }
});

// Obtener pedidos del usuario
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos', error: error.message });
  }
});

// Obtener pedido por ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product user');

    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedido', error: error.message });
  }
});

// Actualizar estado del pedido (requiere admin)
router.put('/:id/status', async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus, paymentStatus },
      { new: true }
    ).populate('items.product user');

    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar pedido', error: error.message });
  }
});

// Obtener todos los pedidos (requiere admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('items.product user')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos', error: error.message });
  }
});

module.exports = router;
