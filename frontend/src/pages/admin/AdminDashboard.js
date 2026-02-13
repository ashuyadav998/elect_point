import React, { useState, useEffect } from 'react';
import { FaBox, FaShoppingBag, FaUsers, FaEuroSign } from 'react-icons/fa';
import { getProducts, getCategories } from '../../services/api';
import axios from 'axios';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    lowStock: 0,
    pendingOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

      // Cargar datos en paralelo
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        getProducts({}),
        axios.get(`${API_URL}/orders`),
        axios.get(`${API_URL}/users`).catch(() => ({ data: [] }))
      ]);

      const products = productsRes.data;
      const orders = ordersRes.data;
      const users = usersRes.data;

      // Calcular estadísticas
      const totalRevenue = orders
        .filter(o => o.paymentStatus === 'pagado')
        .reduce((sum, order) => sum + order.totalAmount, 0);

      const lowStock = products.filter(p => p.stock < 10).length;
      const pendingOrders = orders.filter(o => o.orderStatus === 'pendiente').length;

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalUsers: users.length,
        totalRevenue,
        lowStock,
        pendingOrders
      });

      // Últimos 5 pedidos
      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.error('Error al cargar datos del dashboard:', error);
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
      month: 'short',
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
      cancelado: 'badge-danger'
    };
    return statusMap[status] || 'badge-secondary';
  };

  if (loading) {
    return <div className="loading">Cargando dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h2>Resumen General</h2>

      {/* Tarjetas de estadísticas */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon">
            <FaBox />
          </div>
          <div className="stat-content">
            <h3>Productos</h3>
            <p className="stat-number">{stats.totalProducts}</p>
            {stats.lowStock > 0 && (
              <span className="stat-alert">⚠️ {stats.lowStock} con stock bajo</span>
            )}
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-icon">
            <FaShoppingBag />
          </div>
          <div className="stat-content">
            <h3>Pedidos</h3>
            <p className="stat-number">{stats.totalOrders}</p>
            {stats.pendingOrders > 0 && (
              <span className="stat-alert">{stats.pendingOrders} pendientes</span>
            )}
          </div>
        </div>

        <div className="stat-card purple">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-content">
            <h3>Usuarios</h3>
            <p className="stat-number">{stats.totalUsers}</p>
            <span className="stat-subtitle">Registrados</span>
          </div>
        </div>

        <div className="stat-card orange">
          <div className="stat-icon">
            <FaEuroSign />
          </div>
          <div className="stat-content">
            <h3>Ingresos</h3>
            <p className="stat-number">{formatPrice(stats.totalRevenue)}</p>
            <span className="stat-subtitle">Total facturado</span>
          </div>
        </div>
      </div>

      {/* Pedidos recientes */}
      <div className="recent-orders">
        <h3>Pedidos Recientes</h3>
        {recentOrders.length > 0 ? (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Estado Pago</th>
                  <th>Estado Pedido</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order._id}>
                    <td>#{order._id.slice(-6)}</td>
                    <td>{order.user?.name || 'Usuario'}</td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>{formatPrice(order.totalAmount)}</td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-data">No hay pedidos recientes</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
