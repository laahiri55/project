import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, ShoppingCart, Users, DollarSign, Package, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import OrderService, { Order } from '../../services/OrderService';
import ProductService, { Product } from '../../services/ProductService';
import AdminLayout from './AdminLayout';

const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [ordersData, productsData] = await Promise.all([
          OrderService.getAllOrders(),
          ProductService.getAll(),
        ]);
        
        setOrders(ordersData);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Calculate stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(order => order.status === 'PENDING').length;
  const totalProducts = products.length;
  const lowStockProducts = products.filter(product => product.stock < 10).length;
  
  // Stats cards data
  const statsCards = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: <DollarSign className="w-6 h-6 text-white" />,
      change: '+12.5%',
      trending: 'up',
      bgColor: 'bg-green-500',
    },
    {
      title: 'Orders',
      value: orders.length,
      icon: <ShoppingCart className="w-6 h-6 text-white" />,
      change: '+8.2%',
      trending: 'up',
      bgColor: 'bg-blue-500',
    },
    {
      title: 'Products',
      value: totalProducts,
      icon: <Package className="w-6 h-6 text-white" />,
      change: '+5.1%',
      trending: 'up',
      bgColor: 'bg-purple-500',
    },
    {
      title: 'Low Stock',
      value: lowStockProducts,
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      change: '-2.4%',
      trending: 'down',
      bgColor: 'bg-orange-500',
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Dashboard
          </h1>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
          </div>
        </div>
        
        {loading ? (
          <div className="grid place-items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsCards.map((card, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">{card.title}</p>
                      <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
                      <div className={`flex items-center mt-2 ${
                        card.trending === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {card.trending === 'up' ? (
                          <ArrowUpRight size={16} />
                        ) : (
                          <ArrowDownRight size={16} />
                        )}
                        <span className="text-sm ml-1">{card.change} from last month</span>
                      </div>
                    </div>
                    <div className={`rounded-full p-3 ${card.bgColor}`}>
                      {card.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent Orders</h2>
                <Link 
                  to="/admin/orders" 
                  className="text-sm text-green-500 hover:text-green-600"
                >
                  View All
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.items.length}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${order.status === 'DELIVERED' && 'bg-green-100 text-green-800'}
                            ${order.status === 'SHIPPED' && 'bg-blue-100 text-blue-800'}
                            ${order.status === 'PROCESSING' && 'bg-yellow-100 text-yellow-800'}
                            ${order.status === 'PENDING' && 'bg-orange-100 text-orange-800'}
                            ${order.status === 'CANCELED' && 'bg-red-100 text-red-800'}
                          `}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Revenue Overview</h2>
                </div>
                <div className="p-4 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart className="w-12 h-12 mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-500">Chart visualization would go here</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Top Selling Products</h2>
                </div>
                <div className="p-4">
                  <ul className="divide-y divide-gray-200">
                    {products.slice(0, 5).map((product) => (
                      <li key={product.id} className="py-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 flex-shrink-0">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full rounded-md object-cover"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium">{product.name}</p>
                            <p className="text-xs text-gray-500">${product.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          Stock: {product.stock}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;