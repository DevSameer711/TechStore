import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose.config.js';
import productRouter from './routes/product.route.js';
import adminRouter from './routes/admin.route.js';
import authRoutes from './routes/auth.route.js';
import cartRoutes from './routes/cart.route.js';
import stripePackage from 'stripe';
import { fileURLToPath } from 'url';
import passport from 'passport';
import session from 'express-session';
import WishlistRoutes from './routes/wishlist.route.js'
import orderRoutes from "./routes/order.route.js";
import feedbackRoutes from './routes/feedback.route.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

const app = express();

// Serve static files from 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5174', 'http://localhost:5173'], // Adjust this as per your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PUSH'],
  credentials: true,
}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/product", productRouter);
app.use("/admin/", adminRouter);
app.use('/', authRoutes);
app.use('/cart', cartRoutes);
app.use('/wishlist', WishlistRoutes);
app.use("/orders", orderRoutes);
app.use('/feedback', feedbackRoutes);

// Stripe: Create payment intent route
app.post('/api/checkout', async (req, res) => {
  const { paymentMethodId, userId } = req.body;
  
  // Make sure paymentMethodId is provided
  if (!paymentMethodId) {
    return res.status(400).json({ error: 'Payment method ID is required' });
  }

  try {
    // Create a PaymentIntent with automatic payment methods enabled (remove confirmation_method)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000, // Example amount in cents ($20.00)
      currency: 'usd',
      payment_method: paymentMethodId,
      metadata: { userId: userId }, // Optional: You can store the userId for your reference
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Send client secret back to the frontend for confirmation
    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

// Database connection
dbConnect();

// Server start
const PORT = process.env.PORT || 9999;  // Fallback to 9999 if not set in .env
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
