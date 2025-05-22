import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../App";
import { useOrderStore } from "../data/orders.js";
import useUserStore from "../data/users.js";
import axios from "axios";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [updatedUser, setUpdatedUser] = useState({
    _id: user?.id || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    password: "",
  });

  console.log("User in Profile:", user);

  const getUserOrders = useOrderStore((state) => state.getOrdersByUserEmail);
  const deleteOrder = useOrderStore((state) => state.deleteOrder);
  const updateUser = useUserStore((state) => state.updateUser);

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

  const handleSave = async (e) => {
    e.preventDefault();
    const { _id, firstName, lastName, email, password } = updatedUser;

    // Validation: all fields must be filled
    if (!firstName || !lastName || !email || (step === 2 && !password)) {
      setError("Please fill in all fields");
      return;
    }

    setError("");

    try {
      // Send update request with token in Authorization header
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${_id}`,
        { firstName, lastName, email },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
          withCredentials: true,
        }
      );
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      setError("Error updating user information");
      console.error("Error updating user:", error);
    } finally {
      setUpdatedUser({
        _id: updatedUser?._id || "",
        firstName: updatedUser?.firstName || "",
        lastName: updatedUser?.lastName || "",
        email: updatedUser?.email || "",
        password: ""
      });
      setShowForm(false);
      setStep(1);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
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

  const handleProcced = () => {
    if (!updatedUser.firstName || !updatedUser.lastName || !updatedUser.email) {
      setError("Please fill in all fields");
      return;
    }
    setStep(2);
  };

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="text-center py-5">
          <h1 className="mb-4">Please log in to view your profile</h1>
          <button
            className="btn btn-primary"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const navigate = useNavigate();

  const handleViewOrderDetails = (order) => {
    navigate(`/order-tracking/${order._id}`);
  }

  return (
    <main>
      <Navbar />
      {showForm ? (
        <div className="container py-5">
          <div className="card mb-4">
            <div className="card-header bg-purple text-white">
              <h5 className="mb-0">Edit User Role</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSave}>
                {step === 1 ? (
                  <div>
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={updatedUser.firstName}
                        onChange={(e) =>
                          setUpdatedUser({
                            ...updatedUser,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={updatedUser.lastName}
                        onChange={(e) =>
                          setUpdatedUser({
                            ...updatedUser,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={updatedUser.email}
                        onChange={(e) =>
                          setUpdatedUser({
                            ...updatedUser,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-outline-secondary me-2"
                        onClick={() => setShowForm(false)}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleProcced}
                        className="btn btn-purple"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Enter your password to confirm changes
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={updatedUser.password}
                        onChange={(e) =>
                          setUpdatedUser({
                            ...updatedUser,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-outline-secondary me-2"
                        onClick={() => setStep(1)}
                      >
                        Back
                      </button>
                      <button type="submit" className="btn btn-purple">
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="container py-5">
          {/* Profile Header */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex flex-column flex-md-row align-items-center">
                    <div className="profile-avatar me-md-4 mb-3 mb-md-0">
                      <div
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                        style={{
                          width: "100px",
                          height: "100px",
                          fontSize: "2rem",
                        }}
                      >
                        {user.firstName?.charAt(0)}
                        {user.lastName?.charAt(0)}
                      </div>
                    </div>
                    <div className="profile-info text-center text-md-start">
                      <h1 className="mb-1">
                        {user.firstName} {user.lastName}
                      </h1>
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
              <button
                onClick={() => setShowForm(true)}
                className="btn btn-outline-primary"
              >
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
                      <p className="mb-0 fw-medium">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
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
                              <span className="fw-medium">
                                {order._id.substring(0, 8)}...
                              </span>
                            </td>
                            <td>
                              <span
                                className={`badge ${getStatusBadgeClass(
                                  order.status
                                )}`}
                              >
                                {order.status || "Processing"}
                              </span>
                            </td>
                            <td className="fw-medium">
                              ${order.price?.toFixed(2) || "-"}
                            </td>
                            <td>
                              {order.estimatedDelivery
                                ? new Date(
                                    order.estimatedDelivery
                                  ).toLocaleDateString()
                                : "-"}
                            </td>
                            <td className="text-end pe-4">
                              <button
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => handleViewOrderDetails(order)}
                                
                              >
                                Details
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => confirmCancelOrder(order)}
                                disabled={
                                  order.status?.toLowerCase() === "delivered" ||
                                  order.status?.toLowerCase() === "cancelled"
                                }
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        fill="currentColor"
                        className="bi bi-bag text-muted"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                      </svg>
                    </div>
                    <p className="text-muted mb-0">No orders found.</p>
                    <p className="text-muted">
                      Start shopping to see your orders here!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Confirmation Modal */}
          {showConfirmation && selectedOrder && (
            <div
              className="modal fade show"
              style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
              tabIndex="-1"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirm Cancellation</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowConfirmation(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>
                      Are you sure you want to cancel order
                      <strong>{selectedOrder._id}</strong>?
                    </p>
                    <p className="text-muted small">
                      This action cannot be undone.
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowConfirmation(false)}
                    >
                      No, Keep Order
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleCancelOrder(selectedOrder._id)}
                    >
                      Yes, Cancel Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <Footer />
    </main>
  );
};

export default Profile;
