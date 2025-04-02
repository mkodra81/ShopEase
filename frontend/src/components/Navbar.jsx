
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0); 
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-purple">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          ShopEase
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <Link to="/cart" className="btn btn-outline-light position-relative me-2">
              <i className="bi bi-cart"></i> Cart
              {cartItemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-purple-light">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link to="/admin/login" className="btn btn-outline-light">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
