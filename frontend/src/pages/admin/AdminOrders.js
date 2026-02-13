import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import '../../styles/AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState({
    orderStatus: '',
    paymentStatus: ''
  });

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
      alert('Error al cargar los pedidos');
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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pendiente: 'badge-warning',
      procesando: 'badge-info',
      enviado: 'badge-primary',
      entregado: 'badge-success',
      cancelado: 'badge-danger',
      pagado: 'badge-success',
      fallido: 'badge-danger'
    };
    return statusMap[status] || 'badge-secondary';
  };

  const openDetailModal = (order) => {
    setSelectedOrder(order);
    setStatusUpdate({
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus
    });
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = (e) => {
    setStatusUpdate({
      ...statusUpdate,
      [e.target.name]: e.target.value
    });
  };

  const updateOrderStatus = async () => {
    try {
      await axios.put(`${API_URL}/orders/${selectedOrder._id}/status`, statusUpdate);
      alert('Estado del pedido actualizado correctamente');
      closeDetailModal();
      loadOrders();
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      alert('Error al actualizar el estado del pedido');
    }
  };

  if (loading) {
    return <div className="loading">Cargando pedidos...</div>;
  }

  return (
    <div className="admin-orders">
      <div className="page-header">
        <h2>Gestión de Pedidos</h2>
        <div className="orders-stats">
          <span className="stat-item">
            Total: <strong>{orders.length}</strong>
          </span>
          <span className="stat-item">
            Pendientes: <strong>{orders.filter(o => o.orderStatus === 'pendiente').length}</strong>
          </span>
          <span className="stat-item">
            Procesando: <strong>{orders.filter(o => o.orderStatus === 'procesando').length}</strong>
          </span>
        </div>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado Pago</th>
              <th>Estado Pedido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>
                  <strong>#{order._id.slice(-8)}</strong>
                </td>
                <td>
                  <div className="customer-cell">
                    <strong>{order.user?.name || 'Usuario'}</strong>
                    <small>{order.user?.email}</small>
                  </div>
                </td>
                <td>{formatDate(order.createdAt)}</td>
                <td><strong>{formatPrice(order.totalAmount)}</strong></td>
                <td>
                  <span className={`badge ${getStatusBadge(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td>
                  <span className={`badge ${getStatusBadge(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-icon btn-view"
                      onClick={() => openDetailModal(order)}
                      title="Ver detalles"
                    >
                      <FaEye />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="no-data">No hay pedidos registrados</div>
        )}
      </div>

      {/* Modal de detalle del pedido */}
      {showDetailModal && selectedOrder && (
        <div className="modal-overlay" onClick={closeDetailModal}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detalle del Pedido #{selectedOrder._id.slice(-8)}</h3>
              <button className="modal-close" onClick={closeDetailModal}>×</button>
            </div>

            <div className="order-detail">
              {/* Información del cliente */}
              <div className="detail-section">
                <h4>Información del Cliente</h4>
                <div className="info-grid">
                  <div>
                    <strong>Nombre:</strong> {selectedOrder.user?.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {selectedOrder.user?.email}
                  </div>
                  <div>
                    <strong>Fecha:</strong> {formatDate(selectedOrder.createdAt)}
                  </div>
                  <div>
                    <strong>Método de pago:</strong> {selectedOrder.paymentMethod}
                  </div>
                </div>
              </div>

              {/* Dirección de envío */}
              <div className="detail-section">
                <h4>Dirección de Envío</h4>
                <p>
                  {selectedOrder.shippingAddress.street}<br />
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}<br />
                  {selectedOrder.shippingAddress.country}
                </p>
              </div>

              {/* Productos */}
              <div className="detail-section">
                <h4>Productos ({selectedOrder.items.length})</h4>
                <div className="order-items">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <img 
                        src={item.product?.images?.[0] || 'https://via.placeholder.com/60'} 
                        alt={item.product?.name || 'Producto'}
                      />
                      <div className="item-details">
                        <strong>{item.product?.name || 'Producto no disponible'}</strong>
                        <span>Cantidad: {item.quantity}</span>
                      </div>
                      <div className="item-price">
                        {formatPrice(item.price)} × {item.quantity} = {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-total">
                  <strong>Total:</strong> {formatPrice(selectedOrder.totalAmount)}
                </div>
              </div>

              {/* Notas */}
              {selectedOrder.notes && (
                <div className="detail-section">
                  <h4>Notas del Cliente</h4>
                  <p>{selectedOrder.notes}</p>
                </div>
              )}

              {/* Actualizar estados */}
              <div className="detail-section">
                <h4>Actualizar Estado del Pedido</h4>
                <div className="status-update-form">
                  <div className="form-group">
                    <label>Estado del Pedido</label>
                    <select
                      name="orderStatus"
                      value={statusUpdate.orderStatus}
                      onChange={handleStatusChange}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="procesando">Procesando</option>
                      <option value="enviado">Enviado</option>
                      <option value="entregado">Entregado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Estado del Pago</label>
                    <select
                      name="paymentStatus"
                      value={statusUpdate.paymentStatus}
                      onChange={handleStatusChange}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="pagado">Pagado</option>
                      <option value="fallido">Fallido</option>
                    </select>
                  </div>

                  <button 
                    className="btn btn-primary"
                    onClick={updateOrderStatus}
                  >
                    <FaEdit /> Actualizar Estado
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
