import React, { useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import BottomNavigationBar from '../common/BottomNavigationBar';
import CartSidebar from '../cart/CartSidebar';
import WishlistSidebar from '../wishlist/WishlistSidebar';
import { useWishlist } from '../../hooks/useWishlist';

const MainLayout = ({ children, searchQuery, setSearchQuery }) => {
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        setIsWishlistOpen={setIsWishlistOpen}
      />

      {/* Main Content */}
      <main className="pb-16 md:pb-0">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigationBar />

      {/* Sidebars */}
      <CartSidebar />
      <WishlistSidebar isOpen={isWishlistOpen} setIsOpen={setIsWishlistOpen} />
    </div>
  );
};

export default MainLayout;