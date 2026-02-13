import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getCategories } from '../services/api';
import '../styles/Header.css';

const Header = () => {
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <Link to="/" className="logo">
            <h1>SimShop</h1>
          </Link>

          <div className="search-bar">
            <input type="text" placeholder="Buscar productos..." />
            <button>Buscar</button>
          </div>

          <div className="header-actions">
            {user ? (
              <div className="user-menu">
                <FaUser />
                <span>{user.name}</span>
                <button onClick={handleLogout} className="logout-btn">Salir</button>
              </div>
            ) : (
              <Link to="/login" className="login-link">
                <FaUser />
                <span>Iniciar Sesión</span>
              </Link>
            )}

            <Link to="/carrito" className="cart-link">
              <FaShoppingCart />
              {getCartCount() > 0 && (
                <span className="cart-badge">{getCartCount()}</span>
              )}
            </Link>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
        <div className="container">
          <ul>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link></li>
            <li><Link to="/productos" onClick={() => setMenuOpen(false)}>Todos los Productos</Link></li>
            {categories.slice(0, 6).map(category => (
              <li key={category._id}>
                <Link 
                  to={`/categoria/${category.slug}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
