import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <ShoppingCart className="h-8 w-8 text-green-400" />
              <span className="text-xl font-bold text-white">GreenGrocer</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Fresh groceries delivered to your doorstep. We source the finest quality products to ensure your satisfaction.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-green-400 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-green-400 transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-green-400 transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-300 hover:text-green-400 transition-colors">
                  Order Tracking
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop?category=Fruits%20%26%20Vegetables" className="text-gray-300 hover:text-green-400 transition-colors">
                  Fruits & Vegetables
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Dairy%20%26%20Eggs" className="text-gray-300 hover:text-green-400 transition-colors">
                  Dairy & Eggs
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Meat%20%26%20Seafood" className="text-gray-300 hover:text-green-400 transition-colors">
                  Meat & Seafood
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Bakery" className="text-gray-300 hover:text-green-400 transition-colors">
                  Bakery
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Pantry" className="text-gray-300 hover:text-green-400 transition-colors">
                  Pantry
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">123 Grocery Street, Fresh City, FC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">support@greengrocer.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} GreenGrocer. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-green-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-green-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;