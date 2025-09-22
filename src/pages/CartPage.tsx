import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Trash, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    if (user) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          to="/shop" 
          className="text-green-500 hover:text-green-600 flex items-center"
        >
          <ChevronLeft size={16} className="mr-1" />
          Continue Shopping
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <ShoppingCart size={24} className="mr-2" /> Your Cart
              </h1>
              {cart.items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-600 text-sm flex items-center"
                >
                  <Trash size={16} className="mr-1" /> Clear Cart
                </button>
              )}
            </div>
            
            {cart.items.length === 0 ? (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <ShoppingCart size={64} className="text-gray-300" />
                </div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-6">
                  Looks like you haven't added any products to your cart yet.
                </p>
                <Link
                  to="/shop"
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="border-b pb-4 mb-4 hidden md:grid md:grid-cols-12 text-sm font-medium text-gray-500">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
                
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div 
                      key={item.id} 
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-4 border-b"
                    >
                      {/* Product */}
                      <div className="col-span-6 flex items-center">
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <Link 
                            to={`/product/${item.id}`} 
                            className="font-medium text-gray-800 hover:text-green-500"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600 text-sm flex items-center mt-1"
                          >
                            <Trash size={14} className="mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                        <span className="md:hidden text-gray-500">Price:</span>
                        <span className="font-medium">${item.price.toFixed(2)}</span>
                      </div>
                      
                      {/* Quantity */}
                      <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                        <span className="md:hidden text-gray-500">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-500 hover:text-gray-700"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-2 py-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-500 hover:text-gray-700"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="md:col-span-2 flex justify-between md:justify-end items-center">
                        <span className="md:hidden text-gray-500">Total:</span>
                        <span className="font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Cart Summary */}
        {cart.items.length > 0 && (
          <div className="md:w-1/3 lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Cart Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.items.length} items)</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-green-600">${cart.total.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                <ShoppingBag size={20} className="mr-2" />
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;