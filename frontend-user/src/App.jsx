import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import 'antd/dist/reset.css';
import './App.css';
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import PublicRoute from "./pages/PublicRoute.jsx";
import ProductSearch from './pages/ProductSearch.jsx';
import CartPage from "./pages/CartPage.jsx";
import CheckoutModal from './components/CheckOutModal.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
import AboutUsPage from "./pages/AboutUs.jsx";
import ProfilePage from "./pages/Profile.jsx";
import ProductDetailsPage from "./components/ProductDetails.jsx";

const stripePromise = loadStripe('pk_test_51QXn1tE9bihR1atBVnHb9MXoDspjhmvMxzbPun1Ntv9OQW1YwBZmamlaO5b8kN8FhbDKAzhNVuUl1HlkmvWd8NuN007TmtSGIf');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Header/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<PublicRoute element={<HomePage />} />} />
        <Route path="/contactus" element={<PublicRoute element={<ContactUs />} />} />
        <Route path="/productsearch" element={<PublicRoute element={<ProductSearch />} />} />
        <Route path="/aboutus" element={<PublicRoute element={<AboutUsPage />} />} />
        <Route path="/cartpage" element={<ProtectedRoute element={<CartPage />} />} />
        <Route path="/wishlist" element={<ProtectedRoute element={<WishlistPage />} />} />
        <Route path="/PaymentSuccess" element={<ProtectedRoute element={<PaymentSuccess />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
        <Route path="/product/:id" element={<ProtectedRoute element={<ProductDetailsPage />} />} />
      </Routes>
      <Footer/>
      <CheckoutModal />
    </Elements>
  );
}

export default App;
