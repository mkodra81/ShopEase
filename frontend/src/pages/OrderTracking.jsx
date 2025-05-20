import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const OrderTracking = () => {
  const { orderId } = useParams();
  console.log(orderId);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"; // Replace with your backend URL

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/orders/${orderId}`);
        setOrder(response.data);  
      } catch (error) {
        console.error('Error fetching order details:', error);
        setOrder({ status: 'Not Found' });
      } finally {
        setLoading(false);
      }
    }

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-panna text-darkbrown">
        <Navbar />
        <div className="container mx-auto px-4 py-10 text-center">Loading order details...</div>
        <Footer />
      </main>
    );
  }

  if (!order || order.status === 'Not Found') {
    return (
      <main className="min-h-screen bg-panna text-darkbrown">
        <Navbar />
        <div className="container mx-auto px-4 py-10 text-center">
          <h1 className="text-2xl font-semibold mb-4">Order Not Found</h1>
          <p className="mb-6">We couldn't find an order with the ID: {orderId}</p>
          <Link to="/" className="text-darkbrown underline">Go Home</Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="">
      <Navbar />
      <div className="container mx-auto px-4 py-10 space-y-8">
        <h1 className="text-xl font-semibold my-5">Order Tracking</h1>

        <div className="bg-white border border-darkbrown rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
          <p>Status: <span className="font-medium">{order.status}</span></p>
          <p>Estimated Delivery: <span className="font-medium">{order.estimatedDelivery.slice(0,10)}</span></p>
          <p>Client Name: <span className="font-medium">{order.orderDetails.firstName} {order.orderDetails.lastName}</span></p>
          <p>Total Amount: <span className="font-medium">{order.price} $</span></p>
          <p>Shipping Address: <span className="font-medium">{order.orderDetails.address}</span></p>
        </div>

        <div>
          <Link to="/products" className="btn btn-purple text-white my-5">
            Continue Shopping
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default OrderTracking;
