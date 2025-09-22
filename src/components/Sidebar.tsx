import React from 'react';
import { 
  Home, 
  Users, 
  Bed, 
  Calendar, 
  CreditCard, 
  UserCheck, 
  BarChart3,
  Settings,
  Hotel
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'reservations', label: 'Reservations', icon: Calendar },
  { id: 'guests', label: 'Guests', icon: Users },
  { id: 'rooms', label: 'Rooms', icon: Bed },
  { id: 'checkin', label: 'Check-In/Out', icon: UserCheck },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="bg-slate-900 text-white w-64 min-h-screen p-4">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-700">
        <div className="bg-amber-500 p-2 rounded-lg">
          <Hotel className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold">HotelPro</h1>
          <p className="text-slate-400 text-sm">Management System</p>
        </div>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                isActive
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}