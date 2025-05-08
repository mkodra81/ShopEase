import Order from "../models/order.model.js";

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
  const { userId } = req.params;

  try {
    const orders = await Order.find({ "orderDetails.userId": userId }).populate(
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
  const { id, status, corrierId } = req.query;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, { status, corrierId }, { new: true }).populate("items.productId");
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Order Accepted</title>
          <style>
            body {
              font-family: sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              background: #f0f0f0;
              text-align: center;
            }
            h1 {
              color: green;
            }
          </style>
        </head>
        <body>
          <h1>✅ Order Accepted!</h1>
          <p>Order ID: ${id}</p>
          <p>Status updated to: <strong>${status}</strong></p>
        </body>
      </html>
    `);    res.status(200).json(updatedOrder);
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

export { createOrder, getOrderById, getUserOrders, getOrdersByStatus, updateOrderStatus, getCorrierOrders };
