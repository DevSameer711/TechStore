import express from 'express';
import { addToWishlist, getWishlist, removeItem } from '../controllers/wishlist.controller.js';

const router = express.Router();

// Add an item to the wishlist
router.post('/add', addToWishlist);

// Get the user's wishlist
router.get('/:userId', getWishlist);

// Remove an item from the wishlist
router.delete('/remove/:userId/:wishlistItemId', removeItem);

export default router;
