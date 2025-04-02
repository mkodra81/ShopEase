
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../App';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const { adminLogin, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const success = adminLogin(credentials);
    
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };
  
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-header bg-purple text-white text-center py-3">
                <h4 className="mb-0">Admin Login</h4>
              </div>
              <div className="card-body p-4">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={credentials.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
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
                  
                  <div className="text-center">
                    <small className="text-muted">
                      Demo credentials: admin / password
                    </small>
                  </div>
                </form>
              </div>
              <div className="card-footer bg-light text-center py-3">
                <Link to="/" className="text-decoration-none">
                  Back to Store
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
