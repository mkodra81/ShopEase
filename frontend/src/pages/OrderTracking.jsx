import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OrderTracking = () => {
  const { id } = useParams();

  // Mock order data
  const order = {
    id: id,
    date: new Date().toISOString(),
    trackingInfo: {
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  };

  // Format date helper
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <Navbar />

      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-3 text-success lh-lg">Your Order has been<br /> Placed Successfully!</h1>
          <p className="text-muted">
            Order #{order.id} • Placed on {formatDate(order.date)}
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header bg-purple text-white text-center">
                <h5 className="mb-0">Estimated Delivery Time</h5>
              </div>
              <div className="card-body text-center">
                <p className="h4">{formatDate(order.trackingInfo.estimatedDelivery)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderTracking;