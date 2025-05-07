import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"; // Replace with your backend URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate required fields
    const required = ["firstName", "lastName", "email", "password"];
    for (const key of required) {
      if (!credentials[key]) {
        setError("Please fill in all fields.");
        return;
      }
    }

    await axios
      .post(BACKEND_URL + "/api/users/register", credentials)
      .then((res) => {
        if (res.status === 200) {
          console.log("User registered successfully:", res.data);
          navigate("/login");
        } else {
          setError("Registration failed. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Error during registration:", err.response?.data?.message);
        setError(
          err.response?.data?.message || "Registration failed. Please try again."
        );
      });
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-header bg-purple text-white text-center py-3">
                <h4 className="mb-0">Sign Up</h4>
              </div>
              <div className="card-body p-4">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={credentials.firstName}
                      onChange={handleChange}
                      required
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
                      value={credentials.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="d-grid gap-2 mb-3">
                    <button type="submit" className="btn btn-purple">
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer bg-light text-center pt-3">
                <Link to="/" className="text-decoration-none">
                  Back to Store
                </Link>
              </div>
              <div className="bg-light text-center pb-3">
                <Link to="/login" className="text-decoration-none">
                  Already have an account? Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
