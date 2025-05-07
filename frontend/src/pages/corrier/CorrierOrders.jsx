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

const CorrierOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fetchOrders = useOrderStore((state) => state.getCorrierOrders);
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);
  const { user } = useContext(AuthContext);

  const handleAccept = async () => {

    const orderStatus = selectedOrder.status === "Accepted" ? "Delivering" : "Shipped";

    try {
      await updateOrderStatus(selectedOrder._id, orderStatus, user._id);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrder._id
            ? { ...order, status: orderStatus }
            : order
        )
      );
    } catch (error) {
      console.error("Error accepting order:", error.message);
    }
  };

  useEffect(() => {
    const fetchOrdersByStatus = async () => {
      const orders = await fetchOrders(user._id);
      setOrders(orders.filter((order) => order.status !== "Shipped"));
    };

    fetchOrdersByStatus();
  }, [handleAccept, fetchOrders]);

  const handleView = (order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedOrder(null);
  };

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
                          className="btn btn-sm btn-outline-success me-2"
                          onClick={() => handleView(order)}
                        >
                          {order.status === "Accepted" ? "Start Delivery" : "Mark as Shipped"}
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
                  Scan this QR code to accept this order.
                </DialogDescription>
              </DialogHeader>
              <div>
                <button className="btn btn-primary mt-4" onClick={handleAccept}>
                  {/* <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?data=${selectedOrder._id}`}
                        alt="QR Code"
                        className="w-32 h-32"
                      /> */}
                  Accept
                </button>
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
