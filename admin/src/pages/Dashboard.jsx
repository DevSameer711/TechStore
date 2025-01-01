import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  DollarOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

// Import all page components
import MainPage from "../components/MainPage";
import ProductPage from "../components/ProductPage";
import ProductDetail from "../components/ProductDetail";
import UserPage from "../components/UserPage";
import OrderPage from "../components/OrderPage";
// import SettingsPage from "../components/SettingsPage";

const {Header, Sider, Content } = Layout;

const Dashboard = () => {
  // State to track the currently active component
  const [activeComponent, setActiveComponent] = useState("dashboard");

  // Function to render the selected component
  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <MainPage />;
      case "products":
        return <ProductPage />;
      case "productdetail":
        return <ProductDetail />;
      case "users":
        return <UserPage />;
      case "orders":
        return <OrderPage />;
      case "settings":
        return <SettingsPage />;
      default:
        // return <DashboardPage />;
    }
  };

  return (
    <Layout className="min-h-screen">
      {/* Sidebar */}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        className="bg-gradient-to-br shadow-lg"
      >
        <div className="h-16 flex items-center justify-center text-white text-2xl font-bold">
          TechStore
        </div>
        <Menu
          theme="dark"
          mode="inline"
          className="mt-4"
          defaultSelectedKeys={["dashboard"]}
          onClick={({ key }) => setActiveComponent(key)} // Update the active component
          items={[
            { key: "dashboard", icon: <LineChartOutlined />, label: "Dashboard" },
            { key: "products", icon: <ShoppingOutlined />, label: "Products" },
            { key: "productdetail", icon: <ShoppingOutlined />, label: "Product Details" },
            { key: "users", icon: <UserOutlined />, label: "Users" },
            { key: "orders", icon: <DollarOutlined />, label: "Orders" },
            // { key: "settings", icon: <SettingOutlined />, label: "Settings" },
          ]}
        />
      </Sider>

      {/* Content Area */}
      <Layout>
        {/* Header */}
        <Header
          className="bg-white shadow-lg"
          style={{
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 className="text-2xl font-bold text-blue-900 ml-4">Admin Panel</h2>
          <div className="mr-4">
            <button className="px-4 py-2 text-white bg-indigo-950 hover:bg-indigo-800 rounded-lg transition-all">
              Logout
            </button>
          </div>
        </Header>
        <Content className="p-6 bg-gray-100">
          {renderComponent()} {/* Render the active component */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
