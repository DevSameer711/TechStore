import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  message,
  Spin,
  Modal,
  Form,
  Upload,
  Image,
} from "antd";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch Products from Backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:9999/product");
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      message.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Search Filter Logic
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(value) ||
        product.category.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };

  // Edit Handler
  const handleEdit = (product) => {
    setSelectedProduct(product);
    form.setFieldsValue(product);
    setFileList(
      product.images?.length
        ? [
            {
              uid: "-1",
              name: product.images[0],
              status: "done",
              url: `http://localhost:9999/${product.images[0]}`,
            },
          ]
        : []
    );
    setIsModalVisible(true);
  };

  // Delete Handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9999/product/${id}`);
      message.success("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      message.error("Failed to delete product");
    }
  };

  // Upload Change Handler
  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Update Handler
  const handleUpdate = async (values) => {
    const formData = new FormData();
  
    // Append form data
    Object.keys(values).forEach((key) => {
      if (values[key]) formData.append(key, values[key]);
    });
  
    // Append image file if available
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("image", fileList[0].originFileObj); // Key 'image' matches backend
    }
  
    try {
      await axios.put(
        `http://localhost:9999/product/${selectedProduct._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      message.success("Product updated successfully!");
      setIsModalVisible(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
      message.error("Failed to update product");
    }
  };
  

  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images) =>
        images && images.length > 0 ? (
          <img
            src={`http://localhost:9999/${images[0]}`}
            alt="product"
            className="object-fill h-14 w-auto m-auto"
          />
        ) : (
          <span>No Image</span>
        ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" className="text-base font-semibold bg-blue-400" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="danger" className="text-base font-semibold bg-red-400" onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Product Management</h2>
      <Spin spinning={loading}>
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Search by name or category"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={handleSearch}
            style={{ width: 300 }}
          />
        </Space>
        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          bordered
        />
      </Spin>

      {/* Modal for editing product */}
      <Modal
        title="Edit Product"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdate} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the product name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please input the product category!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the product price!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: "Please input the product stock!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Product Image">
            <Upload.Dragger
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false} // Prevent auto upload
              onChange={handleImageChange}
              maxCount={1}
            >
              {fileList.length > 0 ? null : (
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              )}
            </Upload.Dragger>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Update Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductTable;
