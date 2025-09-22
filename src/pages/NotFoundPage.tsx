import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center">
        <ShoppingCart className="h-20 w-20 text-gray-300 mx-auto mb-6" />
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-green-500 text-white px-6 py-2 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
          >
            <Home size={18} className="mr-2" />
            Back to Home
          </Link>
          <Link
            to="/shop"
            className="bg-white text-green-500 border border-green-500 px-6 py-2 rounded-lg flex items-center justify-center hover:bg-green-50 transition-colors"
          >
            <ShoppingCart size={18} className="mr-2" />
            Shop Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;