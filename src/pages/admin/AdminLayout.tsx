import React, { useState, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  Menu, 
  X, 
  LogOut, 
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const menuItems = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/admin',
    },
    {
      name: 'Products',
      icon: <Package size={20} />,
      path: '/admin/products',
    },
    {
      name: 'Orders',
      icon: <ShoppingCart size={20} />,
      path: '/admin/orders',
    },
    {
      name: 'Users',
      icon: <Users size={20} />,
      path: '/admin/users',
    },
    {
      name: 'Settings',
      icon: <Settings size={20} />,
      path: '/admin/settings',
    },
  ];
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden">
        <div className="fixed top-0 left-0 right-0 z-20 bg-white shadow-sm px-4 py-2 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 focus:outline-none"
          >
            <Menu size={24} />
          </button>
          <Link to="/admin" className="font-bold text-green-500 text-lg">
            Admin Panel
          </Link>
          <Link to="/" className="text-sm text-green-500">
            View Site
          </Link>
        </div>
        <div className="h-14"></div> {/* Spacer for fixed header */}
      </div>
      
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="font-bold text-xl text-green-500">Admin Panel</div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-500 focus:outline-none"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <nav className="mt-4 px-2 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg ${
                    location.pathname === item.path
                      ? 'bg-green-500 text-white'
                      : 'text-gray-700 hover:bg-green-50 hover:text-green-500'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-500 grid place-items-center">
                {user?.name.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:bg-white lg:border-r lg:shadow-sm">
        <div className="flex items-center h-16 px-6 border-b">
          <Link to="/admin" className="font-bold text-xl text-green-500">
            Admin Panel
          </Link>
        </div>
        
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 mt-6 px-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-green-500 text-white'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-500'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="p-4 mt-auto border-t">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-500 grid place-items-center">
                {user?.name.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Link
                to="/"
                className="flex items-center text-gray-700 hover:text-green-500 px-2 py-1 text-sm"
              >
                <span>View Site</span>
                <ChevronRight size={16} className="ml-auto" />
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg text-sm"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="min-h-screen bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;