
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  return (
    <div className="product-card card h-100">
      <img 
        src={product.image} 
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
              onClick={() => addToCart(product)}
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
