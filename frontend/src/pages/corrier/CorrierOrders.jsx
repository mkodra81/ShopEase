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

const CorrierOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchOrders = useOrderStore((state) => state.getCorrierOrders);
  const fetchOrderById = useOrderStore((state) => state.getOrderById);
  
  const { user } = useContext(AuthContext);
  
  const FRONTEND_URL = "http://localhost:5173";

  // Helper to check if order is older than 1 day
  const isOrderOlderThanOneDay = (order) => {
    if (!order.createdAt) return false;
    const orderDate = new Date(order.createdAt);
    const now = new Date();
    const diffMs = now - orderDate;
    return diffMs > 24 * 60 * 60 * 1000; // 1 day in ms
  };

  useEffect(() => {
    const fetchOrdersByStatus = async () => {
      const orders = await fetchOrders(user.id);
      setOrders(orders.filter((order) => order.status !== "Processing" && !isOrderOlderThanOneDay(order)));
    };

    fetchOrdersByStatus();
  }, []); // fetch orders when they are updated

  const handleView = (order) => {
    // Only allow dialog for Accepted or Delivering orders
    if (order.status === "Accepted" || order.status === "Delivering") {
      setSelectedOrder(order);
      setIsDialogOpen(true);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedOrder(null);
  };


  useEffect(() => {
    if (!isDialogOpen) return;
    const interval = setInterval(async () => {
      let prevStatus = selectedOrder.status
      const status = await fetchOrderById(selectedOrder._id);

      if (status.status === "Delivering" && prevStatus === "Accepted" || status.status === "Delivered") {
        alert("Success!");
        const updatedOrders = await fetchOrders(user.id);
        setOrders(updatedOrders.filter((order) => order.status !== "Processing" && !isOrderOlderThanOneDay(order)));
        setSelectedOrder(null);
        setIsDialogOpen(false);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isDialogOpen]);

  return (
    <main>
      <div className="corrier-dashboard">
        <CorrierNavbar />

        <h2 className="mt-5 m-5 font-semibold text-xl">Corrier Dashboard</h2>
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
                          className={`btn btn-sm me-2 ${
                            order.status === "Accepted" || order.status === "Delivering"
                              ? "btn-outline-success"
                              : "btn-outline-secondary"
                            }`}
                            
                          onClick={() => handleView(order)}
                          disabled={
                            order.status !== "Accepted" &&
                            order.status !== "Delivering"
                          }
                        >
                          {order.status === "Accepted"
                            ? "Start Delivery"
                            : order.status === "Delivering"
                            ? "Mark as Delivered"
                            : "Order Completed"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {orders.length === 0 && (
          <div className="text-center mt-5">
            <p>No orders available at the moment.</p>
          </div>
        )}

        {selectedOrder && (
          <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Order Delivery</DialogTitle>
                <DialogDescription>
                  {selectedOrder.status === "Accepted"
                    ? "Scan this QR code to start delivery."
                    : selectedOrder.status === "Delivering"
                    ? "Scan this QR code to mark as delivered."
                    : ""}
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
    </main>
  );
};

export default CorrierOrders;
