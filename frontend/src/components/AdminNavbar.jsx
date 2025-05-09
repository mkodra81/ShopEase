import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const AdminNavbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-purple">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/admin">
          Admin
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin/orders">
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin/users">
                Users
              </Link>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse" id="adminNavbar">
          <div className="d-flex ms-auto justify-content-end">
            <Link to="/" className="btn btn-outline-light me-2">
              View Store
            </Link>
            <button onClick={handleLogout} className="btn btn-outline-light">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
