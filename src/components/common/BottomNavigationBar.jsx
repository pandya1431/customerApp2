import React from 'react';
import { Home, Search, ShoppingCart, User, Grid3X3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';

const BottomNavigationBar = () => {
  const location = useLocation();
  const { cart } = useCart();
  const { user } = useAuth();

  const cartItemCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/',
      active: location.pathname === '/'
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: Grid3X3,
      path: '/categories',
      active: location.pathname === '/categories'
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
      id: 'account',
      label: user ? 'Account' : 'Login',
      icon: User,
      path: user ? '/account' : '/login',
      active: location.pathname === '/account' || location.pathname === '/profile'
    }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 min-w-0 flex-1 ${
                item.active
                  ? 'text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="relative">
                <IconComponent className="w-6 h-6" />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1 truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigationBar;