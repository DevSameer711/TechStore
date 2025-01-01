import React, { useEffect, useState } from "react";
import { Button, InputNumber, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const CartCard = ({ item, onRemove, onUpdateQuantity }) => {
  const [productDetails, setProductDetails] = useState({
    name: "Unnamed Product",
    price: 0,
    image: "https://via.placeholder.com/150",
  });

  const quantity = item?.quantity || 1;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/product/${item?._id}`);
        const product = response.data;
        console.log(product)
        const imageUrl = product.images && product.images[0]
          ? `http://localhost:9999/${product.images[0].replace(/\\/g, "/")}`
          : "https://via.placeholder.com/150";
        setProductDetails({
          ...product,
          image: imageUrl,
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (item?._id) {
      fetchProductDetails();
    }
  }, [item?._id]);

  return (
    <div className="flex items-center justify-between bg-white border-solid border-2 border-gray-200 p-4 shadow-lg rounded-lg ">
      {/* Product Image */}
      <div className="flex-shrink-0 w-20 h-20">
        <img
          alt={productDetails.name}
          src={productDetails.image}
          className="w-10/12 h-full object-center rounded-md"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150?text=No+Image"; // Fallback image
          }}
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow pl-4">
        <h3
          className="text-lg font-semibold text-gray-800 truncate"
          title={productDetails.name}
        >
          {productDetails.name}
        </h3>
        <div className="text-md text-gray-600">${productDetails.price.toFixed(2)}</div>
      </div>

      {/* Quantity Control */}
      <div className="flex items-center">
        <Space size="small">
          <InputNumber
            min={1}
            value={quantity}
            onChange={(value) => onUpdateQuantity(item?.cartItemId, value)}
            className="w-12 border rounded-md"
          />
        </Space>
      </div>

      {/* Remove Button */}
      <div className="flex items-center">
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onRemove(item?.cartItemId)}
          className="text-red-600 hover:text-red-800"
        />
      </div>
    </div>
  );
};

export default CartCard;
