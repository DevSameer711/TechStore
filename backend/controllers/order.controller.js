import Order from "../models/order.model.js"; 

// Create Order
export const createOrder = async (req, res) => {
  const { userId, items, totalAmount, address, phoneNumber } = req.body;

  try {
    // Create a new order
    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      address,
      phoneNumber,
      orderStatus: "Pending", // Default status
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Fetch all orders
export const getAllOrders = async (req, res) => {
  try {
    // Fetch orders and populate related fields (userId and productId)
    const orders = await Order.find()
      .populate("userId", "name email") // Populate user details (name, email)
      .populate("items.productId", "name price") // Populate product details (name, price)
      .exec();

    // Check if orders are found
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    // Return the orders data as the response
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};
// Update order status
export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.status(200).json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status", error });
  }
};


export const getTotalSales = async (req, res) => {
  try {
    // Use MongoDB aggregation to calculate the sum of totalAmount
    const totalSales = await Order.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$totalAmount" } } },
    ]);

    // If no orders exist, return 0
    const totalSalesAmount = totalSales[0]?.totalSales || 0;

    res.status(200).json({ totalSales: totalSalesAmount });
  } catch (error) {
    console.error("Error fetching total sales:", error);
    res.status(500).json({ message: "Failed to calculate total sales", error });
  }
};