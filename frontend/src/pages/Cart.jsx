
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CartContext } from '../App';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, cartTotal } = useContext(CartContext);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL 
  
  if (cart.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="container py-5 text-center">
          <div className="py-5">
            <h1 className="mb-4">Your Cart is Empty</h1>
            <p className="mb-4">Looks like you haven't added any products to your cart yet.</p>
            <Link to="/products" className="btn btn-purple btn-lg">
              Start Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <div className="container py-5">
        <h1 className="mb-4">Your Shopping Cart</h1>
        
        <div className="row">
          <div className="col-lg-8 mb-4 mb-lg-0">
            <div className="card mb-4">
              <div className="card-header bg-purple text-white">
                <h5 className="mb-0">Cart Items ({cart.length})</h5>
              </div>
              <div className="card-body p-0">
                {cart.map((item) => (
                  <div key={item._id} className="p-3 border-bottom">
                    <div className="row align-items-center">
                      <div className="col-md-2 mb-2 mb-md-0">
                        <img 
                          src={`${BACKEND_URL}/${item.image}`} 
                          alt={item.name} 
                          className="img-fluid rounded"
                        />
                      </div>
                      <div className="col-md-4 mb-2 mb-md-0">
                        <h5 className="mb-1">{item.name}</h5>
                        <p className="mb-0 text-muted small">{item.category}</p>
                      </div>
                      <div className="col-md-2 mb-2 mb-md-0">
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                      <div className="col-md-2 mb-2 mb-md-0">
                        <div className="input-group input-group-sm">
                          <button 
                            className="btn btn-outline-secondary" 
                            type="button"
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <input 
                            type="text" 
                            className="form-control text-center" 
                            value={item.quantity}
                            readOnly
                          />
                          <button 
                            className="btn btn-outline-secondary" 
                            type="button"
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2 text-end">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="d-flex">
              <Link to="/products" className="btn btn-outline-dark me-2">
                <i className="bi bi-arrow-left me-1"></i> Continue Shopping
              </Link>
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header bg-purple text-white">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span>{cartTotal >= 50 ? 'Free' : '$5.99'}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Tax:</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3 fw-bold">
                  <span>Total:</span>
                  <span>${(cartTotal + (cartTotal < 50 ? 5.99 : 0) + (cartTotal * 0.08)).toFixed(2)}</span>
                </div>
                
                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-purple"
                    onClick={() => navigate('/checkout')}
                  >
                    Proceed to Checkout
                  </button>
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

export default Cart;
