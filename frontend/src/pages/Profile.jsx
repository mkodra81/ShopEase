import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../App";
import { useOrderStore } from "../data/orders.js";

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log(user)
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const getUserOrders = useOrderStore((state) => state.getOrdersByUserEmail);
  const deleteOrder = useOrderStore((state) => state.deleteOrder);

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (user) {
        try {
          const response = await getUserOrders(user.email);
          setOrders(response);
        } catch (error) {
          console.error("Error fetching user orders:", error);
        } finally {
          setLoadingOrders(false);
        }
      }
    };
    fetchUserOrders();
  }, [user, getUserOrders]);

  const handleCancelOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  const confirmCancelOrder = (order) => {
    setSelectedOrder(order);
    setShowConfirmation(true);
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "processing":
        return "bg-info";
      case "shipped":
        return "bg-primary";
      case "delivered":
        return "bg-success";
      case "cancelled":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="text-center py-5">
          <h1 className="mb-4">Please log in to view your profile</h1>
          <button className="btn btn-primary" onClick={() => window.history.back()}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <main>
      <Navbar />
      <div className="container py-5">
        {/* Profile Header */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex flex-column flex-md-row align-items-center">
                  <div className="profile-avatar me-md-4 mb-3 mb-md-0">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" 
                         style={{ width: "100px", height: "100px", fontSize: "2rem" }}>
                      {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                    </div>
                  </div>
                  <div className="profile-info text-center text-md-start">
                    <h1 className="mb-1">{user.firstName} {user.lastName}</h1>
                    <p className="text-muted mb-0">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Personal Information</h2>
            <button className="btn btn-outline-primary">
              Edit Profile
            </button>
          </div>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Contact Details</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="text-muted small">First Name</label>
                    <p className="mb-0 fw-medium">{user.firstName}</p>
                  </div>
                  <div className="mb-3">
                    <label className="text-muted small">Last Name</label>
                    <p className="mb-0 fw-medium">{user.lastName}</p>
                  </div>
                  <div>
                    <label className="text-muted small">Email Address</label>
                    <p className="mb-0 fw-medium">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Account Summary</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="text-muted small">Member Since</label>
                    <p className="mb-0 fw-medium">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</p>
                  </div>
                  <div className="mb-3">
                    <label className="text-muted small">Total Orders</label>
                    <p className="mb-0 fw-medium">{orders.length}</p>
                  </div>
                  <div>
                    <label className="text-muted small">Account Status</label>
                    <p className="mb-0">
                      <span className="badge bg-success">Active</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div>
          <h2 className="mb-4">Order History</h2>
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              {loadingOrders ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading orders...</span>
                  </div>
                  <p className="mt-3 text-muted">Loading your orders...</p>
                </div>
              ) : orders.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-4">Order ID</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Estimated Delivery</th>
                        <th className="text-end pe-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td className="ps-4">
                            <span className="fw-medium">{order._id.substring(0, 8)}...</span>
                          </td>
                          <td>
                            <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                              {order.status || "Processing"}
                            </span>
                          </td>
                          <td className="fw-medium">${order.price?.toFixed(2) || "-"}</td>
                          <td>
                            {order.estimatedDelivery
                              ? new Date(order.estimatedDelivery).toLocaleDateString()
                              : "-"}
                          </td>
                          <td className="text-end pe-4">
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => alert(`View details for order ${order._id}`)}
                            >
                              Details
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => confirmCancelOrder(order)}
                              disabled={order.status?.toLowerCase() === "delivered" || order.status?.toLowerCase() === "cancelled"}
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5">
                  <div className="mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-bag text-muted" viewBox="0 0 16 16">
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                    </svg>
                  </div>
                  <p className="text-muted mb-0">No orders found.</p>
                  <p className="text-muted">Start shopping to see your orders here!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && selectedOrder && (
        <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Cancellation</h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirmation(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to cancel order <strong>{selectedOrder._id}</strong>?</p>
                <p className="text-muted small">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmation(false)}>
                  No, Keep Order
                </button>
                <button type="button" className="btn btn-danger" onClick={() => handleCancelOrder(selectedOrder._id)}>
                  Yes, Cancel Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
};

export default Profile;