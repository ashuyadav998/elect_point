import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/api';
import '../styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: 'España',
    paymentMethod: 'tarjeta',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated()) {
      alert('Debes iniciar sesión para realizar un pedido');
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        user: user.id,
        items: cart.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: getCartTotal(),
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country
        },
        paymentMethod: formData.paymentMethod,
        notes: formData.notes
      };

      await createOrder(orderData);
      clearCart();
      alert('¡Pedido realizado con éxito!');
      navigate('/');
    } catch (error) {
      console.error('Error al crear pedido:', error);
      alert('Error al procesar el pedido');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  if (cart.length === 0) {
    navigate('/carrito');
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Finalizar Compra</h1>

        <div className="checkout-layout">
          <div className="checkout-form">
            <form onSubmit={handleSubmit}>
              <section className="form-section">
                <h2>Dirección de Envío</h2>

                <div className="form-group">
                  <label htmlFor="street">Dirección</label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">Ciudad</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="postalCode">Código Postal</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="country">País</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>
              </section>

              <section className="form-section">
                <h2>Método de Pago</h2>

                <div className="payment-methods">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="tarjeta"
                      checked={formData.paymentMethod === 'tarjeta'}
                      onChange={handleChange}
                    />
                    <span>Tarjeta de Crédito/Débito</span>
                  </label>

                  <label className="radio-label">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleChange}
                    />
                    <span>PayPal</span>
                  </label>

                  <label className="radio-label">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="transferencia"
                      checked={formData.paymentMethod === 'transferencia'}
                      onChange={handleChange}
                    />
                    <span>Transferencia Bancaria</span>
                  </label>

                  <label className="radio-label">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="contrareembolso"
                      checked={formData.paymentMethod === 'contrareembolso'}
                      onChange={handleChange}
                    />
                    <span>Contrareembolso</span>
                  </label>
                </div>
              </section>

              <section className="form-section">
                <h2>Notas del Pedido (Opcional)</h2>
                <div className="form-group">
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="4"
                    placeholder="¿Alguna instrucción especial para tu pedido?"
                  />
                </div>
              </section>

              <button type="submit" className="place-order-btn" disabled={loading}>
                {loading ? 'Procesando...' : 'Realizar Pedido'}
              </button>
            </form>
          </div>

          <div className="order-summary">
            <h2>Resumen del Pedido</h2>

            <div className="order-items">
              {cart.map(item => (
                <div key={item._id} className="order-item">
                  <img src={item.images[0]} alt={item.name} />
                  <div className="item-info">
                    <p className="item-name">{item.name}</p>
                    <p className="item-quantity">Cantidad: {item.quantity}</p>
                  </div>
                  <p className="item-price">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              <div className="summary-row">
                <span>Envío</span>
                <span>Gratis</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
