import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import axios from "axios";

// Customer Pages
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Admin Pages
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";

//Corriers Pages
import CorrierDashboard from "./pages/corrier/CorrierDashboard";
import CorrierOrders from "./pages/corrier/CorrierOrders";

export const CartContext = createContext(null);
export const AuthContext = createContext(null);

const App = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(false);

  const addToCart = (product: any, quantity: number) => {
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
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    console.log(quantity);
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(
      cart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const BACKEND_URL = "http://localhost:5000"; // Replace with your backend URL

  const logout = async () => {
    await axios.post(
      BACKEND_URL + "/api/users/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
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
            <Route
              path="/order-tracking/:orderId"
              element={<OrderTracking />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />

            {/* Corrier Routes */}
            <Route path="/corrier" element={<CorrierDashboard />} />
            <Route path="/corrier/my-orders" element={<CorrierOrders />} />

            {/* 404 Not Found */}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
