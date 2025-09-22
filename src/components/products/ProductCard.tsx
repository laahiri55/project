import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../services/ProductService';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const { id, name, price, image } = product;
    addToCart({ id, name, price, image });
  };
  
  // Calculate discounted price if applicable
  const finalPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
        {product.stock < 10 && (
          <div className="absolute bottom-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
            Low Stock: {product.stock} left
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 h-10 mt-1">{product.description}</p>
        
        <div className="mt-3 flex justify-between items-center">
          <div>
            {product.discount ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-green-600">${finalPrice.toFixed(2)}</span>
                <span className="text-sm text-gray-400 line-through">${product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-green-600">${product.price.toFixed(2)}</span>
            )}
            <div className="text-xs text-gray-500">per {product.unit}</div>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;