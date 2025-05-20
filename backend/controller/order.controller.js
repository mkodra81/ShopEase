import Order from "../models/order.model.js";

const fetchAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createOrder = async (req, res) => {
  const { estimatedDelivery, price, items, orderDetails } = req.body;

  try {
    const newOrder = new Order({
      estimatedDelivery,
      price,
      items,
      orderDetails,
      status: "Processing",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate("items.productId");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  const { userEmail } = req.params;

  try {
    const orders = await Order.find({ "orderDetails.email": userEmail }).populate(
      "items.productId"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrdersByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const orders = await Order.find({ status }).populate("items.productId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status, corrierId } = req.body

  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status, corrierId }, { new: true }).populate("items.productId");
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(updatedOrder)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCorrierOrders = async (req, res) => {
  const { corrierId } = req.params;

  try {
    const orders = await Order.find({ corrierId }).populate("items.productId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createOrder, getOrderById, getUserOrders, getOrdersByStatus, updateOrderStatus, getCorrierOrders, fetchAllOrders, deleteOrder };
