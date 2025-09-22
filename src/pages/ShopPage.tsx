import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import ProductList from '../components/products/ProductList';

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [showFilters, setShowFilters] = useState(false);
  
  // Categories
  const categories = [
    'All Categories',
    'Fruits & Vegetables',
    'Dairy & Eggs',
    'Meat & Seafood',
    'Bakery',
    'Pantry',
    'Beverages',
  ];
  
  // Handle form submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams(searchParams);
    
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    
    setSearchParams(params);
  };
  
  // Handle category change
  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (category && category !== 'All Categories') {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    
    // Keep the search term
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    
    setSelectedCategory(category === 'All Categories' ? '' : category);
    setSearchParams(params);
    
    // Close filter menu on mobile after selection
    if (window.innerWidth < 768) {
      setShowFilters(false);
    }
  };
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSearchParams({});
  };
  
  // Effect to sync URL params with state
  useEffect(() => {
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';
    
    setSelectedCategory(category);
    setSearchTerm(search);
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {selectedCategory || 'All Products'}
        </h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center text-gray-700 bg-gray-100 px-3 py-2 rounded-lg"
        >
          <Filter size={20} className="mr-2" />
          Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-bold text-xl mb-4">Filters</h2>
            
            {/* Search */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-500"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
            
            {/* Categories */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => handleCategoryChange(category)}
                      className={`w-full text-left px-2 py-1 rounded hover:bg-green-50 ${
                        (category === 'All Categories' && !selectedCategory) || 
                        selectedCategory === category
                          ? 'bg-green-100 text-green-700 font-medium'
                          : 'text-gray-600'
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Reset Filters */}
            {(searchTerm || selectedCategory) && (
              <button
                onClick={resetFilters}
                className="mt-6 w-full flex items-center justify-center text-red-500 border border-red-300 rounded-lg px-4 py-2 hover:bg-red-50"
              >
                <X size={16} className="mr-2" /> Clear Filters
              </button>
            )}
          </div>
        </div>
        
        {/* Mobile Filters */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-sm max-h-[80vh] overflow-y-auto">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="font-bold text-xl">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-4">
                {/* Search */}
                <form onSubmit={handleSearch} className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-500"
                    >
                      <Search size={20} />
                    </button>
                  </div>
                </form>
                
                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Categories</h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          onClick={() => handleCategoryChange(category)}
                          className={`w-full text-left px-2 py-1 rounded hover:bg-green-50 ${
                            (category === 'All Categories' && !selectedCategory) || 
                            selectedCategory === category
                              ? 'bg-green-100 text-green-700 font-medium'
                              : 'text-gray-600'
                          }`}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Reset Filters */}
                {(searchTerm || selectedCategory) && (
                  <button
                    onClick={resetFilters}
                    className="mt-6 w-full flex items-center justify-center text-red-500 border border-red-300 rounded-lg px-4 py-2 hover:bg-red-50"
                  >
                    <X size={16} className="mr-2" /> Clear Filters
                  </button>
                )}
                
                {/* Apply Filters */}
                <button
                  onClick={() => setShowFilters(false)}
                  className="mt-4 w-full bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Product List */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Active Filters */}
            {(searchTerm || selectedCategory) && (
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="text-gray-600">Active Filters:</span>
                {searchTerm && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center">
                    Search: {searchTerm}
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        const params = new URLSearchParams(searchParams);
                        params.delete('search');
                        setSearchParams(params);
                      }}
                      className="ml-1 text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center">
                    Category: {selectedCategory}
                    <button
                      onClick={() => {
                        setSelectedCategory('');
                        const params = new URLSearchParams(searchParams);
                        params.delete('category');
                        setSearchParams(params);
                      }}
                      className="ml-1 text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            )}
            
            <ProductList 
              category={selectedCategory} 
              searchQuery={searchTerm} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;