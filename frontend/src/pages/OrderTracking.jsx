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

  const BACKEND_URL = import.meta.env.BACKEND_URL || "http://localhost:5000"; // Replace with your backend URL

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

  const getStatusIndex = (status) => {
    const statuses = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    return statuses.indexOf(status);
  };

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

  const currentStatusIndex = getStatusIndex(order.status);
  const statuses = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];


  return (
    <main className="min-h-screen bg-panna text-darkbrown">
      <Navbar />
      <div className="container mx-auto px-4 py-10 space-y-8">
        <h1 className="text-3xl font-semibold">Order Tracking</h1>

        <div className="bg-white border border-darkbrown rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
          <p>Status: <span className="font-medium">{order.status}</span></p>
          <p>Estimated Delivery: <span className="font-medium">{order.estimatedDelivery.slice(0,10)}</span></p>

          {/* Progress Bar */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Order Progress</h3>
            <div className="relative pt-1">
              <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-gray-200">
                {statuses.map((status, index) => (
                  <div
                    key={status}
                    style={{ width: '25%' }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${index <= currentStatusIndex ? 'bg-darkbrown' : 'bg-gray-300'} ${index === 0 ? 'rounded-l' : ''} ${index === statuses.length - 1 ? 'rounded-r' : ''}`}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-600 px-1">
                {statuses.map((status) => (
                  <span key={status} className="w-1/4 text-center">{status}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Order Items - Optional */}
          {/* <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Items in this Order</h3>
            {order.items.map((item, index) => (
              <div key={index} className="text-sm">
                {item.name} (Quantity: {item.quantity})
              </div>
            ))}
          </div> */}
        </div>

        <div className="text-center">
          <Link to="/products" className="bg-darkbrown text-panna px-6 py-2 rounded-md hover:opacity-90 transition">
            Continue Shopping
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default OrderTracking;
