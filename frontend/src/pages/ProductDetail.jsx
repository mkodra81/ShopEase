
import { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CartContext } from '../App';
import { useProductStore } from '../data/products.js';

const ProductDetail = () => {

  const getProductById = useProductStore((state) => state.getProductById);

  const { _id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const BACKEND_URL = "http://localhost:5000";
  
  const product = getProductById(_id);
  
  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="container py-5 text-center">
          <h2>Product not found</h2>
          <button 
            className="btn btn-purple mt-3"
            onClick={() => navigate('/products')}
          >
            Back to Products
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate('/cart');
  };

  return (
    <div>
      <Navbar />
      
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={`${BACKEND_URL}/${product.image}`}
              alt={product.name}
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href="/products">Products</a></li>
                <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
              </ol>
            </nav>
            
            <h1 className="mb-3">{product.name}</h1>
            <p className="text-muted mb-3">Category: {product.category}</p>
            <h2 className="text-purple mb-4">${product.price.toFixed(2)}</h2>
            
            <p className="mb-4">{product.description}</p>
            
            <div className="d-flex align-items-center mb-4">
              <label htmlFor="quantity" className="me-3">Quantity:</label>
              <div className="input-group" style={{ width: '150px' }}>
                <button 
                  className="btn btn-outline-secondary" 
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input 
                  type="number" 
                  id="quantity"
                  className="form-control text-center" 
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                />
                <button 
                  className="btn btn-outline-secondary" 
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="d-grid gap-2">
              <button className="btn btn-purple btn-lg" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
            
            <div className="mt-4">
              <div className="d-flex align-items-center mb-2">
                <div className="text-purple me-2"><i className="bi bi-truck"></i></div>
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="text-purple me-2"><i className="bi bi-shield-check"></i></div>
                <span>Secure payment</span>
              </div>
              <div className="d-flex align-items-center">
                <div className="text-purple me-2"><i className="bi bi-arrow-counterclockwise"></i></div>
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
