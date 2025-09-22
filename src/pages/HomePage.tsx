import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Truck, ShieldCheck, Clock, Award } from 'lucide-react';
import ProductList from '../components/products/ProductList';

const HomePage: React.FC = () => {
  // Features list
  const features = [
    {
      icon: <Truck className="w-8 h-8 text-green-500" />,
      title: 'Free Delivery',
      description: 'On orders over $50',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
      title: 'Quality Guarantee',
      description: 'Fresh products, every time',
    },
    {
      icon: <Clock className="w-8 h-8 text-green-500" />,
      title: 'Same-Day Delivery',
      description: 'Order by 11am',
    },
    {
      icon: <Award className="w-8 h-8 text-green-500" />,
      title: 'Premium Selection',
      description: 'Handpicked products',
    },
  ];

  // Categories with images
  const categories = [
    {
      name: 'Fruits & Vegetables',
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link: '/shop?category=Fruits%20%26%20Vegetables',
    },
    {
      name: 'Dairy & Eggs',
      image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link: '/shop?category=Dairy%20%26%20Eggs',
    },
    {
      name: 'Meat & Seafood',
      image: 'https://images.pexels.com/photos/1927377/pexels-photo-1927377.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link: '/shop?category=Meat%20%26%20Seafood',
    },
    {
      name: 'Bakery',
      image: 'https://images.pexels.com/photos/1586947/pexels-photo-1586947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link: '/shop?category=Bakery',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-green-50">
        <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
          <div className="md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Fresh Groceries,<br />
              <span className="text-green-500">Delivered to Your Door</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Shop premium quality groceries from the comfort of your home. 
              Fresh produce, pantry essentials, and more - delivered right to your doorstep.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link 
                to="/shop" 
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                Shop Now
              </Link>
              <Link 
                to="/register" 
                className="bg-white text-green-500 border border-green-500 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
          <div className="relative h-64 md:h-auto overflow-hidden rounded-lg shadow-xl">
            <img 
              src="https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1600" 
              alt="Fresh groceries" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-6 rounded-lg bg-gray-50 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-lg font-semibold ml-3">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Products</h2>
            <Link 
              to="/shop" 
              className="text-green-500 hover:text-green-600 flex items-center"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <ProductList featured={true} limit={8} />
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={category.link}
                className="group relative h-64 rounded-lg overflow-hidden shadow-md"
              >
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-green-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-green-50 max-w-2xl mx-auto mb-8">
            Sign up to receive updates, promotions, and information about new arrivals.
          </p>
          <form className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none"
              required
            />
            <button 
              type="submit" 
              className="bg-gray-800 text-white px-6 py-3 rounded-r-lg hover:bg-gray-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;