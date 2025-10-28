import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../App";
import axios from 'axios';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  console.log("Backend URL:", BACKEND_URL);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        BACKEND_URL + "/api/users/login",
        credentials,
        { withCredentials: true }
      );
      console.log(res.data);
      setUser(res.data);

      if (res.status === 200) {
        switch (res.data.role) {
          case "admin":
            navigate("/admin");
            break;
          case "corrier":
            navigate("/corrier");
            break;
          default:
            navigate("/");
            break;
        }
        console.log("Login successful");
      } else {
        console.error(err)
        setError("Login failed. Please try again.");
      }
    } catch (err) {

      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-header bg-purple text-white text-center py-3">
                <h4 className="mb-0">Login</h4>
              </div>
              <div className="card-body p-4">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
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
                      Login
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
                <Link to="/signup" className="text-decoration-none">
                  Don't have an account? Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
