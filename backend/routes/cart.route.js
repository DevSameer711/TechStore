import express from 'express';
import { addToCart, getCart, removeItem, updateItemQuantity, clearCart } from '../controllers/cart.controller.js';

const router = express.Router();

// Add to cart
router.post("/add", addToCart);

// get cart
router.get('/:userId', getCart);

// Remove item
router.delete('/remove/:userId/:cartItemId', removeItem);

// Update qty
router.put('/update/:userId/:cartItemId', updateItemQuantity);

// Delete full cart
router.delete('/clear/:userId', clearCart);
export default router;
