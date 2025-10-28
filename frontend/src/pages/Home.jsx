import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../data/products.js";
import { useEffect, useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState(true);

  const products = useProductStore((state) => state.products);
  const fetchAllProducts = useProductStore((state) => state.fetchAllProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      await fetchAllProducts().then(() => {
        setLoading(false);
      });
    };
    fetchProducts();
  }, []);

  const featuredProducts = products
    .filter((product) => product.featured)
    .slice(0, 4);

  return (
    <div>
      <Navbar />

      <div className="bg-purple text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h1 className="display-4 fw-bold mb-4">Welcome to ShopEase</h1>
              <p className="lead mb-4">
                Discover amazing products at unbeatable prices.
              </p>
              <Link to="/products" className="btn btn-light btn-lg">
                Shop Now
              </Link>
            </div>
            <div className="col-md-6">
              <img
                src="https://picsum.photos/id/1/600/400"
                alt="Shopping Hero"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Featured Products</h2>
          <Link to="/products" className="btn btn-outline-dark">
            View All
          </Link>
        </div>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading products...</span>
            </div>
            <p className="mt-3 text-muted">Loading products...</p>
          </div>
        ) : (
          <div className="row">
            {featuredProducts.map((product) => (
              <div key={product._id} className="col-md-6 col-lg-3 mb-4">
                <ProductCard loading={loading} product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Promotional Sections */}
      <div className="bg-light py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card text-center h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="display-3 text-purple mb-3">
                    <i className="bi bi-truck"></i>
                  </div>
                  <h3>Free Shipping</h3>
                  <p className="text-muted">On orders over $50</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="display-3 text-purple mb-3">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <h3>Secured Payments</h3>
                  <p className="text-muted">100% secure checkout</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="display-3 text-purple mb-3">
                    <i className="bi bi-arrow-counterclockwise"></i>
                  </div>
                  <h3>Easy Returns</h3>
                  <p className="text-muted">30 day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
