import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { useOrderStore } from "../../data/orders.js";

const Orders = () => {
  const orders = useOrderStore((state) => state.orders);
  const fetchAllOrders = useOrderStore((state) => state.fetchAllOrders);
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);
  const deleteOrder = useOrderStore((state) => state.deleteOrder);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({
    _id: "",
    status: "",
    corrierId: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      await fetchAllOrders();
      setLoading(false);
    };
    fetchOrders();
  }, [fetchAllOrders]);

  useEffect(() => {
    setOrderList(orders);
  }, [orders]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setOrderList(orders);
    } else {
      const filtered = orders.filter((order) =>
        order._id.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setOrderList(filtered);
    }
  };

  const handleEdit = (order) => {
    setCurrentOrder({ ...order });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setCurrentOrder({
      _id: "",
      status: "",
      corrierId: "",
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateOrderStatus(
        currentOrder._id,
        currentOrder.status,
        currentOrder.corrierId
      );
      setShowForm(false);
      setCurrentOrder({
        _id: "",
        status: "",
        corrierId: "",
      });
      await fetchAllOrders();
    } catch (error) {
      console.error("Error updating order:", error.message);
    }
  };

  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }
    try {
      await deleteOrder(_id);
    } catch (error) {
      console.error("Error deleting order:", error.message);
    }
  };

  return (
    loading ? (
      <div className="text-center">
        <h2 className="mt-5 m-5 font-semibold text-xl">Loading...</h2>
      </div>
    ) : (
      <div>
        <AdminNavbar />
        <div className="container py-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="mb-0">Order Management</h1>
          </div>
          {showForm ? (
            <div className="card mb-4">
              <div className="card-header bg-purple text-white">
                <h5 className="mb-0">Edit Order</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSave}>
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <select
                      className="form-select"
                      id="status"
                      name="status"
                      value={currentOrder.status}
                      onChange={(e) =>
                        setCurrentOrder({ ...currentOrder, status: e.target.value })
                      }
                    >
                      <option value="Processing">Processing</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Delivering">Delivering</option>
                      <option value="Delivered">Delivered</option>
                      {currentOrder.status !== "Delivered" && (<option value="Cancelled">Cancelled</option>)}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="corrierId" className="form-label">
                      Corrier ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="corrierId"
                      name="corrierId"
                      value={currentOrder.corrierId}
                      onChange={(e) =>
                        setCurrentOrder({ ...currentOrder, corrierId: e.target.value })
                      }
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-outline-secondary me-2"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-purple">
                      Save Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div>
              <div className="card mb-4">
                <div className="card-body">
                  <div className="input-group">
                    <span className="input-group-text bg-purple text-white">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search orders by ID..."
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header bg-purple text-white">
                  <h5 className="mb-0">Order List</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>User</th>
                          <th>Status</th>
                          <th>Corrier</th>
                          <th>Total</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderList.map((order) => (
                          <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.orderDetails.firstName || order.user || "-"}</td>
                            <td>{order.status}</td>
                            <td>{order.corrierId || "-"}</td>
                            <td>${order.price?.toFixed(2) || "-"}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-dark me-2"
                                onClick={() => handleEdit(order)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(order._id)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Orders;
