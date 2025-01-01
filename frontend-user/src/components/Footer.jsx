import { Input, Button } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';

const Footer = () => (
  <footer className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-10">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-left md:text-center">
      {/* About Us Section */}
      <div>
        <h3 className="text-xl font-bold text-yellow-400 mb-4">About Us</h3>
        <p className="text-sm">
          At TechStore, we are passionate about technology and innovation. Our mission is to bring the latest tech products to your fingertips, including mobiles, headphones, power banks, and more. 
          We pride ourselves on exceptional quality, competitive pricing, and a seamless shopping experience for our customers.
        </p>
      </div>

      {/* Links Section */}
      <div>
        <h3 className="text-xl font-bold text-yellow-400 mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li><a href="/aboutus" className="hover:text-yellow-300">About Us</a></li>
          <li><a href="/contactus" className="hover:text-yellow-300">Contact</a></li>
          <li><a href="/" className="hover:text-yellow-300">Privacy Policy</a></li>
          <li><a href="/" className="hover:text-yellow-300">Terms & Conditions</a></li>
        </ul>
      </div>

      {/* Newsletter Section */}
      <div>
        <h3 className="text-xl font-bold text-yellow-400 mb-4">Newsletter</h3>
        <p className="text-sm mb-4">
          Stay updated with the latest tech trends and exclusive offers. Subscribe to our newsletter today!
        </p>
        <div className="flex justify-between items-center">
          <Input
            placeholder="Enter your email"
            className="w-2/3 rounded-l-md"
          />
          <Button type="primary" className="bg-yellow-400 hover:bg-yellow-500 rounded-r-md">
            Subscribe
          </Button>
        </div>
      </div>

      {/* Social Media Section */}
      <div>
        <h3 className="text-xl font-bold text-yellow-400 mb-4">Follow Us</h3>
        <div className="flex justify-center space-x-4 text-2xl">
          <a href="https://facebook.com" className="hover:text-yellow-300"><FacebookOutlined /></a>
          <a href="https://twitter.com" className="hover:text-yellow-300"><TwitterOutlined /></a>
          <a href="https://instagram.com" className="hover:text-yellow-300"><InstagramOutlined /></a>
          <a href="https://youtube.com" className="hover:text-yellow-300"><YoutubeOutlined /></a>
        </div>
      </div>
    </div>
    <div className="mt-10 text-center text-sm text-yellow-200 border-t border-yellow-300 pt-4">
      © {new Date().getFullYear()} TechStore. All rights reserved.
    </div>
  </footer>
);

export default Footer;
