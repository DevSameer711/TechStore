import React, { useState, useEffect } from "react";
import { Table, Button, message, Spin, Avatar } from "antd";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:9999/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        message.error("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);



  // Define table columns
  const columns = [
    {
      title: "Profile Picture",
      dataIndex: "picture",
      key: "picture",
      render: (text) => <Avatar src={text} alt="User Picture" />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "Card Details",
      key: "card",
      render: (text, record) =>
        record.card?.cardNumber
          ? `Card: **** **** **** ${record.card.cardNumber.slice(-4)}`
          : "No Card Info",
    },
    
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">User List</h1>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        bordered
        className="shadow-lg bg-white"
      />
    </div>
  );
};

export default UserList;
