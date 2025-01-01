import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  specifications: { type: Array, default: [] },
  images: { type: [String]},
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;