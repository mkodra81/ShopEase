import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-purple py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="mb-3">ShopEase</h5>
            <p className="mb-3">
              Your premium shopping destination for quality products at
              competitive prices.
            </p>
            <p>
              &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
            </p>
          </div>
          <div className="col-md-4 ms-auto mb-4 mb-md-0">
            <h5 className="mb-3">Shop</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="/products"
                  className="text-white text-decoration-none"
                >
                  All Products
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/products?category=featured"
                  className="text-white text-decoration-none"
                >
                  Featured
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/products?category=new"
                  className="text-white text-decoration-none"
                >
                  New Arrivals
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/products?category=sale"
                  className="text-white text-decoration-none"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 ms-auto justify-content-end">
            <h5 className="mb-3">Join Our Newsletter</h5>
            <p className="mb-3">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Your email address"
              />
              <button
                className="btn btn-light"
                type="button"
                onClick={() => alert("Subscribed!")}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
