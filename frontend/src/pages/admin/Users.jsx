import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import useUserStore from "../../data/users.js";
import { use } from "react";

const Users = () => {

  const users = useUserStore((state) => state.users);
  const fetchAllUsers = useUserStore((state) => state.fetchAllUsers);
  const updateUser = useUserStore((state) => state.updateUser);
  const deleteUser = useUserStore((state) => state.deleteUser);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      await fetchAllUsers();
      setLoading(false);
    };
    fetchUsers();
  }, [fetchAllUsers]);

  useEffect(() => {
    setUserList(users);
  }, [users]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.firstName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setUsers(filtered);
    }
  };

  const handleEdit = (user) => {
    setCurrentUser({ ...user });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setCurrentUser({
      _id: "",
      firstName: "",
      lastName: "",
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const { _id, role } = currentUser;
    if (_id) {
      await updateUser(_id, { role });
    } else {
      await createUser({ role });
    }
    await fetchAllUsers();
    setShowForm(false);
    setCurrentUser({
      _id: "",
      role: "user"
    });
  }

  return (
    <main>
      <AdminNavbar />
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">User Management</h1>
        </div>
        {showForm ? (
            <div className="card mb-4">
              <div className="card-header bg-purple text-white">
                <h5 className="mb-0">Edit User Role</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSave}>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={currentUser.firstName}
                      onChange={(e) =>
                        setCurrentUser({ ...currentUser, firstName: e.target.value })
                      }
                      disabled
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
                      value={currentUser.lastName}
                      onChange={(e) =>
                        setCurrentUser({ ...currentUser, lastName: e.target.value })
                      }
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                      Role
                    </label>
                    <select
                      className="form-select"
                      id="role"
                      name="role"
                      value={currentUser.role}
                      onChange={(e) =>
                        setCurrentUser({ ...currentUser, role: e.target.value })
                      }
                    >
                      <option value="user">User</option>
                      <option value="corrier">Corrier</option>
                      <option value="admin">Admin</option>
                    </select>
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
                    placeholder="Search users by ID..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header bg-purple text-white">
                <h5 className="mb-0">User List</h5>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userList.map((user) => (
                        <tr key={user._id}>
                          <td>{user._id}</td>
                          <td>{user.firstName || user.user || "-"}</td>
                          <td>{user.lastName}</td>
                          <td>{user.email || "-"}</td>
                          <td>{user.role.toUpperCase() || "-"}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-dark me-2"
                              onClick={() => handleEdit(user)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(user._id)}
                            >
                              Delete
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
    </main>
  );
};

export default Users;
