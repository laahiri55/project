import { api } from './api';
import { CartItem } from '../contexts/CartContext';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELED';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

// Mock data for demo
const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    userId: '2',
    items: [
      {
        id: '1',
        name: 'Organic Bananas',
        price: 1.99,
        image: 'https://images.pexels.com/photos/1166648/pexels-photo-1166648.jpeg?auto=compress&cs=tinysrgb&w=600',
        quantity: 2,
      },
      {
        id: '3',
        name: 'Whole Milk',
        price: 2.49,
        image: 'https://images.pexels.com/photos/5779650/pexels-photo-5779650.jpeg?auto=compress&cs=tinysrgb&w=600',
        quantity: 1,
      },
    ],
    total: 6.47,
    status: 'DELIVERED',
    shippingAddress: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      country: 'USA',
    },
    paymentMethod: 'Credit Card',
    createdAt: '2023-04-15T10:30:00Z',
    updatedAt: '2023-04-17T14:20:00Z',
  },
  {
    id: '2',
    userId: '2',
    items: [
      {
        id: '6',
        name: 'Fresh Atlantic Salmon',
        price: 12.99,
        image: 'https://images.pexels.com/photos/3296280/pexels-photo-3296280.jpeg?auto=compress&cs=tinysrgb&w=600',
        quantity: 1,
      },
      {
        id: '10',
        name: 'Extra Virgin Olive Oil',
        price: 8.99,
        image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking.jpg?auto=compress&cs=tinysrgb&w=600',
        quantity: 1,
      },
    ],
    total: 21.98,
    status: 'SHIPPED',
    shippingAddress: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      country: 'USA',
    },
    paymentMethod: 'PayPal',
    createdAt: '2023-05-20T15:45:00Z',
    updatedAt: '2023-05-21T09:15:00Z',
  },
];

// Admin mock orders
const ADMIN_MOCK_ORDERS: Order[] = [
  ...MOCK_ORDERS,
  {
    id: '3',
    userId: '3',
    items: [
      {
        id: '4',
        name: 'Large Brown Eggs',
        price: 3.49,
        image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=600',
        quantity: 2,
      },
      {
        id: '7',
        name: 'Artisan Sourdough Bread',
        price: 4.99,
        image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=600',
        quantity: 1,
      },
    ],
    total: 11.97,
    status: 'PENDING',
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Othertown',
      state: 'NY',
      zipCode: '67890',
      country: 'USA',
    },
    paymentMethod: 'Credit Card',
    createdAt: '2023-06-05T08:30:00Z',
    updatedAt: '2023-06-05T08:30:00Z',
  },
  {
    id: '4',
    userId: '4',
    items: [
      {
        id: '2',
        name: 'Fresh Strawberries',
        price: 3.99,
        image: 'https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg?auto=compress&cs=tinysrgb&w=600',
        quantity: 3,
      },
      {
        id: '12',
        name: 'Fresh Orange Juice',
        price: 3.99,
        image: 'https://images.pexels.com/photos/8gu1oe1pU54/pexels-photo-892615.jpeg?auto=compress&cs=tinysrgb&w=600',
        quantity: 2,
      },
    ],
    total: 19.95,
    status: 'PROCESSING',
    shippingAddress: {
      street: '789 Pine Ln',
      city: 'Somewhere',
      state: 'TX',
      zipCode: '54321',
      country: 'USA',
    },
    paymentMethod: 'PayPal',
    createdAt: '2023-06-10T14:20:00Z',
    updatedAt: '2023-06-11T09:45:00Z',
  },
];

// Order service for interacting with the backend
const OrderService = {
  getMyOrders: async (): Promise<Order[]> => {
    try {
      // In a real app:
      // const response = await api.get('/orders/my-orders');
      // return response.data;
      
      // For demo:
      return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_ORDERS), 500);
      });
    } catch (error) {
      console.error('Error fetching user orders:', error);
      return [];
    }
  },
  
  getAllOrders: async (): Promise<Order[]> => {
    try {
      // In a real app:
      // const response = await api.get('/orders');
      // return response.data;
      
      // For demo:
      return new Promise((resolve) => {
        setTimeout(() => resolve(ADMIN_MOCK_ORDERS), 500);
      });
    } catch (error) {
      console.error('Error fetching all orders:', error);
      return [];
    }
  },
  
  getOrderById: async (id: string): Promise<Order | null> => {
    try {
      // In a real app:
      // const response = await api.get(`/orders/${id}`);
      // return response.data;
      
      // For demo:
      const order = [...ADMIN_MOCK_ORDERS].find(o => o.id === id) || null;
      return new Promise((resolve) => {
        setTimeout(() => resolve(order), 300);
      });
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error);
      return null;
    }
  },
  
  createOrder: async (
    items: CartItem[],
    shippingAddress: Order['shippingAddress'],
    paymentMethod: string
  ): Promise<Order> => {
    try {
      // Calculate total
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      
      // In a real app:
      // const response = await api.post('/orders', {
      //   items,
      //   shippingAddress,
      //   paymentMethod,
      //   total,
      // });
      // return response.data;
      
      // For demo:
      const newOrder: Order = {
        id: String(Math.floor(Math.random() * 10000)),
        userId: '2', // Current user id (would come from auth context)
        items,
        total,
        status: 'PENDING',
        shippingAddress,
        paymentMethod,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      return new Promise((resolve) => {
        setTimeout(() => resolve(newOrder), 800);
      });
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },
  
  updateOrderStatus: async (id: string, status: Order['status']): Promise<Order> => {
    try {
      // In a real app:
      // const response = await api.put(`/orders/${id}/status`, { status });
      // return response.data;
      
      // For demo:
      const orderIndex = ADMIN_MOCK_ORDERS.findIndex(o => o.id === id);
      if (orderIndex === -1) {
        throw new Error('Order not found');
      }
      
      const updatedOrder = {
        ...ADMIN_MOCK_ORDERS[orderIndex],
        status,
        updatedAt: new Date().toISOString(),
      };
      
      return new Promise((resolve) => {
        setTimeout(() => resolve(updatedOrder), 500);
      });
    } catch (error) {
      console.error(`Error updating order ${id} status:`, error);
      throw error;
    }
  },
  
  cancelOrder: async (id: string): Promise<void> => {
    try {
      // In a real app:
      // await api.put(`/orders/${id}/cancel`);
      
      // For demo:
      return new Promise((resolve) => {
        setTimeout(() => resolve(), 500);
      });
    } catch (error) {
      console.error(`Error canceling order ${id}:`, error);
      throw error;
    }
  },
};

export default OrderService;