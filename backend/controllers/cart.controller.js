import Cart from '../models/cart.model.js';

// Add an item to the cart
export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Check if the user already has a cart
    let cart = await Cart.findOne({ userId });

    // If no cart, create a new one
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      // If cart exists, check if the product is already in the cart
      const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

      if (itemIndex > -1) {
        // If product exists, update the quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If product doesn't exist, add a new item
        cart.items.push({ productId, quantity });
      }
    }

    // Save the cart
    await cart.save();
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get the user's cart
export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price image');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller for removing an item from the cart
export const removeItem = async (req, res) => {
  const { userId, cartItemId } = req.params;  // Use cartItemId (_id of the item)

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item and remove it from the cart
    const itemIndex = cart.items.findIndex(item => item._id.toString() === cartItemId);

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);  // Remove the item from the items array
      await cart.save();
      return res.status(200).json({ message: 'Item removed from cart', cart });
    } else {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Update the quantity of an item in the cart
export const updateItemQuantity = async (req, res) => {
  const { userId, cartItemId } = req.params;  // Use cartItemId here
  const { quantity } = req.body;

  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid quantity' });
  }

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item and update the quantity using cartItemId
    const itemIndex = cart.items.findIndex((item) => item._id.toString() === cartItemId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      return res.status(200).json({ message: 'Item quantity updated', cart });
    } else {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Clear all items in the user's cart
    cart.items = [];
    await cart.save();

    return res.status(200).json({ message: 'Cart cleared successfully', cart });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};