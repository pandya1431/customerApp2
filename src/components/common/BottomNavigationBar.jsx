import React from 'react';
import { Home, Search, ShoppingCart, User, Package } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';

const BottomNavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();
  const { user } = useAuth();

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/',
      active: location.pathname === '/'
    },
    {
      id: 'search',
      label: 'Search',
      icon: Search,
      path: '/search',
      active: location.pathname === '/search'
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: ShoppingCart,
      path: '/cart',
      active: location.pathname === '/cart',
      badge: cartItemCount
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: Package,
      path: '/orders',
      active: location.pathname === '/orders'
    },
    {
      id: 'account',
      label: 'Account',
      icon: User,
      path: user ? '/account' : '/login',
      active: location.pathname === '/account' || location.pathname === '/profile'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center justify-center p-2 min-w-0 flex-1 relative ${
                item.active
                  ? 'text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="relative">
                <IconComponent className="w-5 h-5 xs:w-6 xs:h-6" />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 xs:w-5 xs:h-5 flex items-center justify-center font-medium">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs xs:text-sm mt-1 font-medium ${
                item.active ? 'text-emerald-600' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigationBar;