// product.routes.js
import express from 'express';
import upload from '../config/multer.config.js';
import { addProduct, updateProduct, getProductById, getAllProducts, deleteProduct,getProductsByCategory, getRandomProducts, searchProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/search', searchProducts);
router.get('/random', getRandomProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);
router.get('/', getAllProducts);
router.post('/', upload.array('images'), addProduct);
router.put('/:id', upload.array('images'), updateProduct);
router.delete("/:id", deleteProduct);


export default router;



