import React, { useState, useEffect } from "react";
import { Table, Button, Tag, Select, message, Spin } from "antd";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:9999/orders");
      setOrders(response.data);
      console.log(response)
    } catch (error) {
      message.error("Failed to fetch orders");
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const handleUpdateStatus = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:9999/orders/${orderId}/status`, { orderStatus: status });
      message.success("Order status updated successfully");
      fetchOrders(); // Refresh orders
    } catch (error) {
      message.error("Failed to update order status");
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Define table columns
  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items) =>
        items.map((item) => (
          <div key={item.productId._id}>
            {item.productId.name} (x{item.quantity})
          </div>
        )),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleUpdateStatus(record._id, value)}
          style={{ width: 120 }}
        >
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Shipped">Shipped</Select.Option>
          <Select.Option value="Delivered">Delivered</Select.Option>
        </Select>
      ),
    },
    
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">Orders Management</h1>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={orders}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          className="shadow-lg"
        />
      )}
    </div>
  );
};

export default OrderList;
