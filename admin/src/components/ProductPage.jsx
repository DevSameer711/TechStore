import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Select, Button, Upload, message, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios"; // Ensure axios is imported

const { Option } = Select;

const ProductManager = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState(null); // For update functionality
  const [categories, setCategories] = useState([]); // Mock category list
  const [imageFiles, setImageFiles] = useState([]); // Multiple images

  useEffect(() => {
    // Mock fetching categories
    setCategories(["Mobiles", "Headphones", "Laptops", "Smartwatches"]);
  }, []);

// ProductManager.jsx
const handleSubmit = async (values) => {
  try {
    setLoading(true);
    const formData = new FormData();

    // Append fields to formData
    Object.keys(values).forEach((key) => {
      if (key === 'specifications') {
        formData.append(key, JSON.stringify(values[key]));
      } else {
        formData.append(key, values[key]);
      }
    });

    imageFiles.forEach(file => formData.append('images', file));

    // Send data to the backend
    const response = await axios.post('http://localhost:9999/product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      message.success('Product added successfully!');
      form.resetFields();
      setImageFiles([]);
    } else {
      message.error('Failed to add product');
    }
  } catch (error) {
    console.error(error);
    message.error('An error occurred while submitting the product');
  } finally {
    setLoading(false);
  }
};

const handleImageUpload = (info) => {
  const isImage = info.file.type.startsWith("image/");
  const isSmallEnough = info.file.size / 1024 / 1024 < 2; // Less than 2MB

  if (!isImage) {
    message.error("You can only upload image files!");
    return;
  }
  if (!isSmallEnough) {
    message.error("Image must be smaller than 2MB!");
    return;
  }

  setImageFiles(info.fileList.map((file) => file.originFileObj));
  message.success(`${info.file.name} uploaded successfully.`);
};

  

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{productId ? "Update Product" : "Add Product"}</h2>
      <Spin spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            stock: 1,
            price: 0,
          }}
        >
          {/* Name */}
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: "Please enter the product name" }]}>
            <Input placeholder="Enter product name" />
          </Form.Item>

          {/* Stock */}
          <Form.Item
            label="Stock"
            name="stock"
            rules={[{ required: true, message: "Please enter the stock quantity" }]}>
            <InputNumber min={0} placeholder="Enter stock quantity" className="w-full" />
          </Form.Item>

          {/* Description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter the product description" }]}>
            <Input.TextArea rows={4} placeholder="Enter product description" />
          </Form.Item>

          {/* Price */}
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the price" }]}>
            <InputNumber min={0} prefix="$" placeholder="Enter price" className="w-full" />
          </Form.Item>

          {/* Category */}
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category" }]}>
            <Select placeholder="Select a category">
              {categories.map((cat) => (
                <Option key={cat} value={cat}>{cat}</Option>
              ))}
            </Select>
          </Form.Item>

          {/* Brand */}
          <Form.Item
            label="Brand"
            name="brand"
            rules={[{ required: true, message: "Please enter the brand name" }]}>
            <Input placeholder="Enter brand name" />
          </Form.Item>

          {/* Specifications */}
          <Form.Item label="Specifications">
            <Form.List name="specifications">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Form.Item
                        name={[name, "key"]}
                        fieldKey={[fieldKey, "key"]}
                        rules={[{ required: true, message: "Please enter the specification name" }]}
                        noStyle>
                        <Input placeholder="Specification Name" className="w-1/2" />
                      </Form.Item>
                      <Form.Item
                        name={[name, "value"]}
                        fieldKey={[fieldKey, "value"]}
                        rules={[{ required: true, message: "Please enter the specification value" }]}
                        noStyle>
                        <Input placeholder="Specification Value" className="w-1/2" />
                      </Form.Item>
                      <Button onClick={() => remove(name)} type="link">Remove</Button>
                    </div>
                  ))}
                  <Button onClick={() => add()} type="dashed" block>Add Specification</Button>
                </>
              )}
            </Form.List>
          </Form.Item>

          {/* Images */}
          <Form.Item label="Product Images">
            <Upload
              beforeUpload={() => false} // Prevent auto upload
              onChange={handleImageUpload}
              accept="image/*">
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          <Button type="primary" htmlType="submit" block>{productId ? "Update Product" : "Add Product"}</Button>
        </Form>
      </Spin>
    </div>
  );
};

export default ProductManager;
