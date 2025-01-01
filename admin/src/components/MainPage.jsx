import React, { useEffect, useState } from "react";
import { Layout, Card, Statistic, Spin, message } from "antd";
import { UserOutlined, ShoppingOutlined } from "@ant-design/icons";
import axios from "axios";

const { Content } = Layout;

const MainPage = () => {
  const [dashboardData, setDashboardData] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    recentOrders: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch total sales
      const salesRes = await axios.get("http://localhost:9999/orders/total-sales");

      // Fetch orders
      const ordersRes = await axios.get("http://localhost:9999/orders");

      // Fetch users
      const usersRes = await axios.get("http://localhost:9999/users");

      // Fetch products
      const productsRes = await axios.get("http://localhost:9999/product");

      // Update state with fetched data
      setDashboardData({
        totalSales: salesRes.data.totalSales,
        totalOrders: ordersRes.data.length,
        totalUsers: usersRes.data.length,
        totalProducts: productsRes.data.length,
        recentOrders: ordersRes.data.slice(0, 5), // Fetch the first 5 orders
      });
    } catch (error) {
      console.error("Error in fetchDashboardData:", error);
      message.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Function to get the user name from the usersData array based on the userId
  const getUserNameById = (userId) => {
    const user = usersData.find((user) => user._id === userId);
    return user ? user.name : "Unknown";
  };

  const { totalSales, totalOrders, totalUsers, totalProducts, recentOrders } = dashboardData;

  // Function to return the appropriate color for the status
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-red-500"; // Red for pending
      case "Shipped":
        return "text-yellow-500"; // Yellow for shipped
      case "Delivered":
        return "text-green-500"; // Green for delivered
      default:
        return "text-black"; // Default if status is unknown
    }
  };

  return (
    <Layout>
      <Content className="p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Dashboard Overview</h1>

        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Spin size="large" />
          </div>
        ) : (
          <>
            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:scale-105 transition-all shadow-lg">
                <Statistic
                  title="Total Sales"
                  value={totalSales}
                  prefix="$"
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
              <Card className="hover:scale-105 transition-all shadow-lg">
                <Statistic
                  title="Total Orders"
                  value={totalOrders}
                  prefix={<ShoppingOutlined />}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
              <Card className="hover:scale-105 transition-all shadow-lg">
                <Statistic
                  title="Active Users"
                  value={totalUsers}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: "#ffc107" }}
                />
              </Card>
              <Card className="hover:scale-105 transition-all shadow-lg">
                <Statistic
                  title="Total Products"
                  value={totalProducts}
                  valueStyle={{ color: "#cf1322" }}
                />
              </Card>
            </div>

            {/* Recent Orders Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-700">Recent Orders</h2>
              <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="w-full border-collapse border border-gray-200">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-4 py-2">Order ID</th>
                      <th className="px-4 py-2">Total</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-blue-50 transition-all">
                        <td className="px-4 py-2 border">{order._id}</td>
                        <td className="px-4 py-2 border">${order.totalAmount.toFixed(2)}</td>
                        <td className={`px-4 py-2 border text-center ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </Content>
    </Layout>
  );
};

export default MainPage;
