import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOrderStore } from "../../data/orders.js";
import { AuthContext } from "../../App"

const UpdatingOrder = () => {
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);
  const getOrderById = useOrderStore((state) => state.getOrderById);
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const { user } = useContext(AuthContext);
  
  const { orderId } = useParams();

  const handleUpdate = async (updateStatus) => {

    if (order) {
      const res = await updateOrderStatus(order._id, updateStatus, user.id);
      setOrder({ ...order, status: updateStatus });
      setStep((prev) => prev + 1);
      
      if (res.status === 200) {
        alert("Order status updated successfully!");
        setLoading(false);
        window.close();
      }
      else {
        alert("Error updating order status:", res.data);
      }
    }
  };

  useEffect(() => {
    if (step !== 2 || !order) return;
    
    let updateStatus = order.status;
    switch (order.status) {
      case "Processing":
        updateStatus = "Accepted";
        break;
      case "Accepted":
        updateStatus = "Delivering";
        break;
      case "Delivering":
        updateStatus = "Delivered";
        break;
      default:
        updateStatus = "Testing";
    }

    handleUpdate(updateStatus);
    setStep(3);
  }, [step === 2]);

  useEffect(() => {
    if (step !== 1) return;

    const fetchOrder = async () => {
      setLoading(true);
      const order = await getOrderById(orderId);
      setOrder(order);
      setStep(2)
    };

    fetchOrder();
  }, [step === 1]);

};

export default UpdatingOrder;
