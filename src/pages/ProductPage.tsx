import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Minus, Plus, ShieldCheck, Truck, PackageCheck } from 'lucide-react';
import ProductService, { Product } from '../services/ProductService';
import { useCart } from '../contexts/CartContext';
import ProductList from '../components/products/ProductList';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const fetchedProduct = await ProductService.getById(id);
        setProduct(fetchedProduct);
        
        // Update page title
        if (fetchedProduct) {
          document.title = `${fetchedProduct.name} | GreenGrocer`;
        }
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    
    // Reset page title on unmount
    return () => {
      document.title = 'Vite + React + TS';
    };
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const { id, name, price, image } = product;
      addToCart({ id, name, price, image }, quantity);
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Calculate final price with discount
  const finalPrice = product && product.discount
    ? product.price * (1 - product.discount / 100)
    : product?.price || 0;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'Product not found'}
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the product you're looking for. It may have been removed or the URL might be incorrect.
          </p>
          <Link 
            to="/shop" 
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link 
          to="/shop" 
          className="text-green-500 hover:text-green-600 flex items-center"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Shop
        </Link>
      </div>
      
      {/* Product Details */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="p-6 md:p-8 flex items-center justify-center bg-gray-50">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-w-full max-h-[400px] object-contain"
            />
          </div>
          
          {/* Product Info */}
          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                {product.category}
              </span>
              {product.stock < 10 && (
                <span className="ml-2 bg-amber-100 text-amber-700 text-sm px-3 py-1 rounded-full">
                  Low Stock: {product.stock} left
                </span>
              )}
            </div>
            
            <p className="text-gray-600 mb-6">
              {product.description}
            </p>
            
            {/* Price */}
            <div className="mb-6">
              {product.discount ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-green-600">
                    ${finalPrice.toFixed(2)}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded ml-2">
                    {product.discount}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-green-600">
                  ${product.price.toFixed(2)}
                </span>
              )}
              <div className="text-sm text-gray-500 mt-1">per {product.unit}</div>
            </div>
            
            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <span className="mr-4 font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="px-3 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-1 border-x border-gray-300 min-w-[50px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                  className="px-3 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-colors ${
                product.stock === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              <ShoppingCart size={20} />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            
            {/* Features */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-gray-50">
                <ShieldCheck className="w-6 h-6 text-green-500 mb-2" />
                <span className="text-sm font-medium">Quality Guarantee</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-gray-50">
                <Truck className="w-6 h-6 text-green-500 mb-2" />
                <span className="text-sm font-medium">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-gray-50">
                <PackageCheck className="w-6 h-6 text-green-500 mb-2" />
                <span className="text-sm font-medium">Secure Packaging</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          You May Also Like
        </h2>
        <ProductList category={product.category} limit={4} />
      </div>
    </div>
  );
};

export default ProductPage;