
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useProductStore } from '../data/products.js';

const ProductList = () => {

  const fetchAllProducts = useProductStore((state) => state.fetchAllProducts);
  const getProductsByCategory = useProductStore((state) => state.getProductsByCategory);
  const products = useProductStore((state) => state.products);

  const [searchParams] = useSearchParams(); 
  const categoryParam = searchParams.get('category'); 
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
  const [sortBy, setSortBy] = useState('name-asc');

  useEffect(() => {
    const fetchProducts = async () => {
      await fetchAllProducts();
    };
    fetchProducts();
  }, [fetchAllProducts]);

  // Get unique categories from products
  const categories = ['all', 'featured', ...products.reduce((acc, product) => {
    if (!acc.includes(product.category)) acc.push(product.category);
    return acc;
  }, [])];
  useEffect(() => {
    // Filter products by category
    const categoryProducts = getProductsByCategory(activeCategory);
    
    // Sort products
    let sortedProducts = [...categoryProducts];
    switch (sortBy) {
      case 'name-asc':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    
    setFilteredProducts(sortedProducts);
  }, [activeCategory, sortBy]);

  return (
    <div>
      <Navbar />
      
      <div className="container py-5">
        <h1 className="mb-4">Product Catalog</h1>
        
        <div className="row">
          {/* Sidebar - Categories */}
          <div className="col-lg-3 mb-4 mb-lg-0">
            <div className="card">
              <div className="card-header bg-purple text-white">
                <h5 className="mb-0">Categories</h5>
              </div>
              <div className="list-group list-group-flush">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`list-group-item list-group-item-action ${activeCategory === category ? 'active bg-purple' : ''}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <span>Showing {filteredProducts.length} products</span>
              </div>
              <div className="d-flex align-items-center">
                <label htmlFor="sortSelect" className="me-2">Sort by:</label>
                <select 
                  id="sortSelect"
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                </select>
              </div>
            </div>
            
            <div className="row">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div key={product.id} className="col-md-6 col-lg-4 mb-4">
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <h3>No products found</h3>
                  <p>Try selecting a different category</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductList;
