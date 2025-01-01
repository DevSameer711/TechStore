import Wishlist from '../models/wishlist.model.js';

// Add an item to the wishlist
export const addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Check if the user already has a wishlist
    let wishlist = await Wishlist.findOne({ userId });

    // If no wishlist, create a new one
    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        items: [{ productId }],
      });
    } else {
      // If wishlist exists, check if the product is already in the wishlist
      const itemIndex = wishlist.items.findIndex((item) => item.productId.toString() === productId);

      if (itemIndex > -1) {
        return res.status(400).json({ message: 'Product is already in the wishlist.' });
      } else {
        // If product doesn't exist, add a new item
        wishlist.items.push({ productId });
      }
    }

    // Save the wishlist
    await wishlist.save();
    res.status(200).json({ message: 'Item added to wishlist', items: wishlist.items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get the user's wishlist
export const getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ userId }).populate('items.productId', 'name price image');
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Controller for removing an item from the wishlist
export const removeItem = async (req, res) => {
  const { userId, wishlistItemId } = req.params;  // Use wishlistItemId (_id of the item)

  try {
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Find the item and remove it from the wishlist
    const itemIndex = wishlist.items.findIndex(item => item.productId.toString() === wishlistItemId);

    if (itemIndex > -1) {
      wishlist.items.splice(itemIndex, 1);  // Remove the item from the items array
      await wishlist.save();
      return res.status(200).json({ message: 'Item removed from wishlist', items: wishlist.items });
    } else {
      return res.status(404).json({ message: 'Item not found in wishlist' });
    }
  } catch (err) {
    console.error(err.message);  // Log error for debugging
    res.status(500).json({ error: err.message });
  }
};
