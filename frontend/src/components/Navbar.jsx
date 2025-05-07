import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext, CartContext } from "../App";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleProfile = () => {
    if (user.role === "admin") {
      navigate("/admin");
    } else if (user.role === "corrier") {
      navigate("/corrier");
    } else {
      navigate("/profile");
    }
  };

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
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/products">
                Products
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <Link to="/cart" className="text-white position-relative me-4">
              <i className="bi bi-cart"></i> Cart
              {cartItemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-purple-light">
                  {cartItemCount}
                </span>
              )}
            </Link>
            {user ? (
              <div>
                <button
                  onClick={handleProfile}
                  className="text-white position-relative me-4"
                >
                  {user.firstName} {user.lastName}
                </button>
                <button
                  onClick={() => logout()}
                  className="text-white position-relative me-4"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-white position-relative me-4">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
