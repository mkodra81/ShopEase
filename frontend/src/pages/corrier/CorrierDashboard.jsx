import React, { useContext, useState, useEffect } from "react";
import CorrierNavbar from "../../components/CorrierNavbar";
import { useOrderStore } from "../../data/orders.js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../../components/ui/dialog";
import { AuthContext } from "../../App";
import QRCode from "react-qr-code";

const CorrierDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useOrderStore((state) => state.getOrdersByStatus);
  const fetchOrderById = useOrderStore((state) => state.getOrderById);

  const BACKEND_URL = "http://localhost:5000";
  const FRONTEND_URL = "http://localhost:5173";

  const fetchOrdersByStatus = async () => {
    setLoading(true);
    const orders = await fetchOrders("Processing");
    setOrders(orders);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrdersByStatus();
  }, []);

  const handleView = (order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    if (!isDialogOpen) return;
    const interval = setInterval(async () => {
      const status = await fetchOrderById(selectedOrder._id);
      if (status.status === "Accepted") {
        alert("Order accepted successfully!");
        setIsDialogOpen(false);
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== selectedOrder._id)
        );
      }
    }
    , 5000);

    return () => clearInterval(interval);
  }, [isDialogOpen]);

  if (orders.length === 0 && !loading) {
    return (
      <div className="corrier-dashboard">
        <CorrierNavbar />
        <h2 className="mt-5 m-5 font-semibold text-xl">Corrier Dashboard</h2>
        <div className="mx-5 mt-5">
          <div>
            <p className="text-center text-2xl">No orders available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="corrier-dashboard">
      <CorrierNavbar />

      <h2 className="mt-5 m-5 font-semibold text-xl">Corrier Dashboard</h2>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div>Loading</div>
        </div>
      ) : (
        <div className="card mx-5 mt-5">
          <div className="card-header bg-purple text-white">
            <h5 className="mb-0">Orders</h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.orderDetails.firstName}</td>
                      <td>{order.orderDetails.address}</td>
                      <td>{order.status}</td>
                      <td>${order.price.toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-success me-2"
                          onClick={() => handleView(order)}
                        >
                          Take Order
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {selectedOrder && (
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Order Delivery</DialogTitle>
              <DialogDescription>
                Scan this QR code to accept this order.
              </DialogDescription>
            </DialogHeader>
            <div>
              <QRCode
                value={`${FRONTEND_URL}/corrier/update-status/${selectedOrder._id}`}
                size={256}
                style={{ margin: "0 auto" }}
                target="_blank"
              />
            </div>
            <DialogClose asChild>
              <button className="btn btn-primary mt-4">Close</button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CorrierDashboard;
