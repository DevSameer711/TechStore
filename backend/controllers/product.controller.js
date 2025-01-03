import Product from '../models/product.model.js'; // Import Product model
import fs from 'fs';
import path from 'path';
import { PythonShell } from 'python-shell'; 
import { fileURLToPath } from "url";
//import { loadModel, predictImage } from "../utils/imageClassifier.js";
import { spawn } from 'child_process';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Load the model once during server initialization



// Route to handle image prediction
// export const predictImageWithModel = async (req, res) => {
//   try {
//     const file = req.file; // Uploaded image

//     if (!file) {
//       return res.status(400).json({ message: "No image file uploaded" });
//     }
//     console.log(file); 
//     // Path to the Python script
//     const pythonScriptPath = path.join(__dirname, 'scripts', 'prediction.py');

//     // Spawn a child process to run the Python script
//     const pythonProcess = spawn('python', [pythonScriptPath, path.normalize(file.path).replace(/\\/g, '/')]);


//     let prediction = '';

//     pythonProcess.stdout.on('data', (data) => {
//       prediction += data.toString();
//     });

//     pythonProcess.stderr.on('data', (data) => {
//       console.error(`Error from Python script: ${data.toString()}`);
//     });

//     pythonProcess.on('close', (code) => {
//       if (code === 0) {
//         console.log(`Prediction result: ${prediction.trim()}`); // Debugging
//         return res.status(200).json({ prediction: prediction.trim() });
//       } else {
//         return res.status(500).json({ message: "Prediction failed" });
//       }
//     });
//   } catch (error) {
//     console.error(`Error in prediction handler: ${error}`);
//     res.status(500).json({ message: "An error occurred while predicting the image" });
//   }
// };
export const predictImageWithModel = async (req, res) => {
  try {
    const file = req.file; // Uploaded image
    if (!file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    // Path to the Python script
    const pythonScriptPath = path.join(__dirname, 'scripts', 'prediction.py');

    // Spawn a child process to run the Python script
    const pythonProcess = spawn('python', [pythonScriptPath, file.path]);

    let prediction = '';

    pythonProcess.stdout.on('data', (data) => {
      prediction += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error from Python script: ${data.toString()}`);
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        console.log(`Prediction result: ${prediction.trim()}`); // Debugging
        return res.status(200).json({ prediction: prediction.trim() });
      } else {
        return res.status(500).json({ message: "Prediction failed" });
      }
    });
  } catch (error) {
    console.error(`Error in prediction handler: ${error}`);
    res.status(500).json({ message: "An error occurred while predicting the image" });
  }
};




// Add new product
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, brand, specifications } = req.body;
    const images = req.files;

    // Validate required fields
    if (!name || !description || !price || !stock || !category || !brand) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Save new product
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      brand,
      specifications: JSON.parse(specifications), // Parse the JSON object for specifications
      images: images.map(file => file.path) // Save image paths
    });

    await newProduct.save();
    res.status(200).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while adding the product' });
  }
};




export const updateProduct = async (req, res) => {
  const { id } = req.params; // Get the productId from the route parameter
  const updatedData = req.body; // Get updated product details from the body

  // If there are image files uploaded
  let imagePaths = [];

  if (req.files && req.files.length > 0) {
    // Store file paths of the uploaded images
    imagePaths = req.files.map(file => file.path);
  }

  // Prepare updated product data
  const productData = {
    ...updatedData, // Fields to update
    images: imagePaths.length > 0 ? imagePaths : undefined, // If images are uploaded, include them
  };

  try {
    // Find the product by ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If new images are uploaded, remove the old images from the file system
    if (imagePaths.length > 0) {
      // Remove old images (if any)
      product.images.forEach(image => {
        const imagePath = path.join(__dirname, '..', image); // Get full path of the image
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error('Error deleting old image:', err);
          }
        });
      });
    }

    // Update the product in the database with the new data
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });

    return res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "An error occurred while updating the product" });
  }
};





// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Optionally, delete images if stored locally
    if (product.images?.length > 0) {
      product.images.forEach(image => {
        const filePath = path.join(__dirname, "../uploads", image);  // Adjust path as needed
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting product" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving the product' });
  }
};


export const getProductsByCategory = async (req, res) => {
  const { category } = req.params; // Get category from route params

  try {
    // Find products by category
    const products = await Product.find({ category }).limit(10); // You can adjust the limit as needed

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found in this category' });
    }

    return res.status(200).json(products); // Return the products
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving products' });
  }
};

export const getRandomProducts = async (req, res) => {
  try {
    // Get 10 random products from the database
    const products = await Product.aggregate([{ $sample: { size: 10 } }]);

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const searchProducts = async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    // If search query exists, use it to filter products
    const regex = new RegExp(search, 'i'); // Case-insensitive search

    // Find products where the name or description matches the search query
    const products = await Product.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        { brand: { $regex: regex } },
        { category: { $regex: regex } }
      ]
    })
      .skip(skip)
      .limit(parseInt(limit));

    // Get the total number of products that match the search query (without pagination)
    const totalProducts = await Product.countDocuments({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        { brand: { $regex: regex } },
        { category: { $regex: regex } }
      ]
    });

    res.json({
      products,
      totalProducts,
    });
  } catch (error) {
    console.error("Error in searchProducts controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};