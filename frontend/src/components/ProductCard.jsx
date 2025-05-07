import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';
import { Skeleton } from '../components/ui/skeleton'


const ProductCard = ({loading, product }) => {
  const { addToCart } = useContext(CartContext);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"; // Replace with your backend URL

  if (loading) {
    return (
      <div className="product-card card h-100 border-0 shadow-sm">
        <Skeleton className="w-100" style={{ height: '200px' }} />
        <div className="card-body d-flex flex-column">
          <Skeleton className="card-title w-75 h-6 mb-2" />
          <Skeleton className="card-text w-50 h-4 mb-2" />
          <Skeleton className="card-text mb-2 w-100 h-4" />
          <div className="mt-auto">
            <Skeleton className="fw-bold w-25 h-6 mb-3" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="product-card card h-100">
      <img 
        src={`${BACKEND_URL}/${product.image}`} 
        className="card-img-top" 
        alt={product.name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted">{product.category}</p>
        <p className="card-text mb-2 text-truncate">{product.description}</p>
        <div className="mt-auto">
          <p className="fw-bold">${product.price.toFixed(2)}</p>
          <div className="d-flex">
            <Link to={`/products/${product._id}`} className="btn btn-outline-dark me-2 flex-grow-1">
              View
            </Link>
            <button 
              className="btn btn-purple flex-grow-1"
              onClick={() => addToCart(product, 1)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
