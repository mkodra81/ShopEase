
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CartContext } from '../App';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useContext(CartContext);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'Albania',
    paymentMethod: 'Debit'
  });
  
  const [step, setStep] = useState(1);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProcced = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.city || !formData.zip) {
      alert('Please fill in all required fields.');
      return;
    }
    setStep(2);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const mockOrderId = "ORD-" + Math.floor(1000 + Math.random() * 9000);
    
    clearCart();
    navigate(`/order-tracking/${mockOrderId}`);
  };
  
  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div>
      <Navbar />
      
      <div className="container py-5">
        <h1 className="mb-4">Checkout</h1>
        
        <div className="row">
          <div className="col-lg-8 mb-4 mb-lg-0">
            <div className="card mb-4">
              <div className="card-header bg-purple text-white">
                <div className="d-flex justify-content-between">
                  <h5 className="mb-0">
                    {step === 1 ? 'Shipping Information' : 'Payment Method'}
                  </h5>
                  <div>
                    Step {step} of 2
                  </div>
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {step === 1 ? (
                    <div>
                      <div className="row mb-3">
                        <div className="col-md-6 mb-3 mb-md-0">
                          <label htmlFor="firstName" className="form-label">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="lastName" className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="row mb-3">
                        <div className="col-md-5 mb-3 mb-md-0">
                          <label htmlFor="city" className="form-label">City</label>
                          <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="zip" className="form-label">Zip</label>
                          <input
                            type="text"
                            className="form-control"
                            id="zip"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <label htmlFor="country" className="form-label">Country</label>
                        <select
                          className="form-select"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                        >
                          <option value="ALB">Albiania</option>
                          <option value="USA">United States</option>
                          <option value="ITA">Italy</option>
                          <option value="GER">Germany</option>
                          <option value="GBR">United Kingdom</option>
                        </select>
                      </div>
                      
                      <div className="d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn btn-purple"
                          onClick={() => handleProcced()}
                        >
                          Continue to Payment
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-4">
                        <h5 className="mb-3">Payment Method</h5>
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="creditCard"
                            value="credit"
                            checked={formData.paymentMethod === 'credit'}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="creditCard">
                            Credit / Debit Card
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="paypal"
                            value="paypal"
                            checked={formData.paymentMethod === 'paypal'}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="paypal">
                            PayPal
                          </label>
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between">
                        <button
                          type="button"
                          className="btn btn-outline-dark"
                          onClick={() => setStep(1)}
                        >
                          Back to Shipping
                        </button>
                        <button
                          type="submit"
                          className="btn btn-purple"
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-header bg-purple text-white">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  {cart.map((item) => (
                    <div key={item.id} className="d-flex justify-content-between mb-2">
                      <span>
                        {item.name} <span className="text-muted">× {item.quantity}</span>
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <hr />
                
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
                <div className="d-flex justify-content-between mb-0 fw-bold">
                  <span>Total:</span>
                  <span>${(cartTotal + (cartTotal < 50 ? 5.99 : 0) + (cartTotal * 0.08)).toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <h5 className="mb-3">Need Help?</h5>
                <p className="mb-2">
                  <i className="bi bi-telephone me-2"></i>
                  Call us: (555) 123-4567
                </p>
                <p className="mb-0">
                  <i className="bi bi-envelope me-2"></i>
                  Email: support@purplecartopia.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
