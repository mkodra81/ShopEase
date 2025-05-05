import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";

// Customer Pages
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminProducts from "./pages/admin/Products";
import AdminLogin from "./pages/admin/Login";

export const CartContext = createContext(null);
export const AuthContext = createContext(null);

const App = () => {
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const addToCart = (product: any, quantity : number) => {
    const existingProduct = cart.find((item) => item._id === product._id);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity}]);
    }
  };

  const removeFromCart = (productId : string) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId : string, quantity : number) => {
    console.log(quantity)
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(
      cart.map((item) => (item._id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
  const PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  const adminLogin = (credentials : any) => {

    if (
      credentials.username === USERNAME &&
      credentials.password === PASSWORD
    ) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, adminLogin, adminLogout }}>
      <CartContext.Provider
        value={{
          cart,
          addToCart,
          removeFromCart,
          updateQuantity,
          clearCart,
          cartTotal: cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ),
        }}
      >
        <BrowserRouter>
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:_id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-tracking/:id" element={<OrderTracking />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminProducts />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
