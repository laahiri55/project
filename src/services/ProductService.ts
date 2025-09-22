import { api } from './api';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  featured: boolean;
  discount?: number;
  unit: string;
}

// For demo purposes, we'll use mock data
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    description: 'Sweet and delicious organic bananas, perfect for snacking or baking.',
    price: 1.99,
    image: 'https://images.pexels.com/photos/1166648/pexels-photo-1166648.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Fruits & Vegetables',
    stock: 45,
    featured: true,
    unit: 'bunch',
  },
  {
    id: '2',
    name: 'Fresh Strawberries',
    description: 'Juicy, ripe strawberries, perfect for desserts or healthy snacking.',
    price: 3.99,
    image: 'https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Fruits & Vegetables',
    stock: 30,
    featured: true,
    discount: 10,
    unit: 'box',
  },
  {
    id: '3',
    name: 'Whole Milk',
    description: 'Farm-fresh whole milk, pasteurized and homogenized.',
    price: 2.49,
    image: 'https://images.pexels.com/photos/5779650/pexels-photo-5779650.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Dairy & Eggs',
    stock: 20,
    featured: false,
    unit: 'gallon',
  },
  {
    id: '4',
    name: 'Large Brown Eggs',
    description: 'Farm-fresh large brown eggs from free-range chickens.',
    price: 3.49,
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Dairy & Eggs',
    stock: 36,
    featured: true,
    unit: 'dozen',
  },
  {
    id: '5',
    name: 'Grass-fed Beef',
    description: 'Premium grass-fed beef, perfect for steaks and burgers.',
    price: 8.99,
    image: 'https://images.pexels.com/photos/618775/pexels-photo-618775.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Meat & Seafood',
    stock: 15,
    featured: false,
    unit: 'lb',
  },
  {
    id: '6',
    name: 'Fresh Atlantic Salmon',
    description: 'Wild-caught Atlantic salmon, rich in omega-3 fatty acids.',
    price: 12.99,
    image: 'https://images.pexels.com/photos/3296280/pexels-photo-3296280.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Meat & Seafood',
    stock: 10,
    featured: true,
    discount: 15,
    unit: 'lb',
  },
  {
    id: '7',
    name: 'Artisan Sourdough Bread',
    description: 'Handcrafted sourdough bread with a crispy crust and chewy interior.',
    price: 4.99,
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Bakery',
    stock: 8,
    featured: true,
    unit: 'loaf',
  },
  {
    id: '8',
    name: 'Chocolate Chip Cookies',
    description: 'Freshly baked chocolate chip cookies made with premium ingredients.',
    price: 3.99,
    image: 'https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Bakery',
    stock: 24,
    featured: false,
    unit: 'dozen',
  },
  {
    id: '9',
    name: 'Organic Pasta',
    description: 'Organic durum wheat pasta, perfect for a variety of dishes.',
    price: 2.29,
    image: 'https://images.pexels.com/photos/6287525/pexels-photo-6287525.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Pantry',
    stock: 40,
    featured: false,
    unit: 'box',
  },
  {
    id: '10',
    name: 'Extra Virgin Olive Oil',
    description: 'Cold-pressed extra virgin olive oil from Italy.',
    price: 8.99,
    image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking.jpg?auto=compress&cs=tinysrgb&w=600',
    category: 'Pantry',
    stock: 15,
    featured: true,
    unit: 'bottle',
  },
  {
    id: '11',
    name: 'Organic Green Tea',
    description: 'Premium organic green tea with antioxidant properties.',
    price: 4.49,
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Beverages',
    stock: 30,
    featured: false,
    unit: 'box',
  },
  {
    id: '12',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice with no added sugar.',
    price: 3.99,
    image: 'https://images.pexels.com/photos/8gu1oe1pU54/pexels-photo-892615.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Beverages',
    stock: 12,
    featured: true,
    discount: 5,
    unit: 'bottle',
  },
];

// Methods to interact with the backend
const ProductService = {
  getAll: async (params?: { category?: string; search?: string }): Promise<Product[]> => {
    try {
      // In a real app, this would be an API call:
      // const response = await api.get('/products', { params });
      // return response.data;
      
      // For demo purposes, we'll filter the mock data
      let filteredProducts = [...MOCK_PRODUCTS];
      
      if (params?.category) {
        filteredProducts = filteredProducts.filter(
          product => product.category === params.category
        );
      }
      
      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filteredProducts = filteredProducts.filter(
          product => 
            product.name.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower) ||
            product.category.toLowerCase().includes(searchLower)
        );
      }
      
      return new Promise((resolve) => {
        setTimeout(() => resolve(filteredProducts), 300);
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },
  
  getFeatured: async (): Promise<Product[]> => {
    try {
      // In a real app:
      // const response = await api.get('/products/featured');
      // return response.data;
      
      // For demo:
      const featuredProducts = MOCK_PRODUCTS.filter(product => product.featured);
      return new Promise((resolve) => {
        setTimeout(() => resolve(featuredProducts), 300);
      });
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }
  },
  
  getById: async (id: string): Promise<Product | null> => {
    try {
      // In a real app:
      // const response = await api.get(`/products/${id}`);
      // return response.data;
      
      // For demo:
      const product = MOCK_PRODUCTS.find(p => p.id === id) || null;
      return new Promise((resolve) => {
        setTimeout(() => resolve(product), 300);
      });
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      return null;
    }
  },
  
  create: async (product: Omit<Product, 'id'>): Promise<Product> => {
    try {
      // In a real app:
      // const response = await api.post('/products', product);
      // return response.data;
      
      // For demo:
      const newProduct = {
        ...product,
        id: String(Math.floor(Math.random() * 10000)),
      };
      return new Promise((resolve) => {
        setTimeout(() => resolve(newProduct), 500);
      });
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },
  
  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    try {
      // In a real app:
      // const response = await api.put(`/products/${id}`, product);
      // return response.data;
      
      // For demo:
      const existingIndex = MOCK_PRODUCTS.findIndex(p => p.id === id);
      if (existingIndex === -1) {
        throw new Error('Product not found');
      }
      
      const updatedProduct = {
        ...MOCK_PRODUCTS[existingIndex],
        ...product,
      };
      
      return new Promise((resolve) => {
        setTimeout(() => resolve(updatedProduct), 500);
      });
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id: string): Promise<void> => {
    try {
      // In a real app:
      // await api.delete(`/products/${id}`);
      
      // For demo:
      return new Promise((resolve) => {
        setTimeout(() => resolve(), 500);
      });
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  },
};

export default ProductService;