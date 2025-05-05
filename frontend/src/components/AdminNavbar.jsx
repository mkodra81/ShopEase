import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const AdminNavbar = () => {
  const { adminLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    adminLogout();
    navigate('/');
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-purple">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/admin">
          PurpleCartopia Admin
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
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
