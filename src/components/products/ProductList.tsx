import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import ProductService, { Product } from '../../services/ProductService';

interface ProductListProps {
  category?: string;
  searchQuery?: string;
  featured?: boolean;
  limit?: number;
}

const ProductList: React.FC<ProductListProps> = ({ 
  category, 
  searchQuery, 
  featured = false,
  limit
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let fetchedProducts: Product[];
        
        if (featured) {
          fetchedProducts = await ProductService.getFeatured();
        } else {
          fetchedProducts = await ProductService.getAll({ 
            category, 
            search: searchQuery 
          });
        }

        // Apply limit if specified
        if (limit && fetchedProducts.length > limit) {
          fetchedProducts = fetchedProducts.slice(0, limit);
        }
        
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchQuery, featured, limit]);

  if (loading) {
    return (
      <div className="grid place-items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
        <p className="text-gray-500 mt-2">
          {searchQuery 
            ? `No results found for "${searchQuery}". Try a different search term.` 
            : category 
              ? `No products available in the ${category} category.` 
              : 'No products available at the moment.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;