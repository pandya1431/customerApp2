import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import SearchPage from './pages/SearchPage';
import CategoriesPage from './pages/CategoriesPage';
import DineOutPage from './pages/DineOutPage';
import FoodDeliveryPage from './pages/FoodDeliveryPage';
import InstaMartPage from './pages/InstaMartPage';
import AddressesPage from './pages/AddressesPage';
import WishlistPage from './pages/WishlistPage';

// Import components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import BottomNavigationBar from './components/common/BottomNavigationBar';
import MobileProfilePage from './components/common/MobileProfilePage';
import CartSidebar from './components/cart/CartSidebar';
import WishlistSidebar from './components/wishlist/WishlistSidebar';

// Import hooks
import { useAuth } from './hooks/useAuth';
import { useCart } from './hooks/useCart';
import { useWishlist } from './hooks/useWishlist';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated } = useAuth();
  const { isOpen: isCartOpen, setIsOpen: setIsCartOpen } = useCart();
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#10b981',
              color: '#fff',
            },
          }}
        />
        
        {/* Header - Show on all pages except login/register */}
        <Routes>
          <Route path="/login" element={null} />
          <Route path="/register" element={null} />
          <Route path="*" element={
            <Header 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
              setIsWishlistOpen={setIsWishlistOpen}
            />
          } />
        </Routes>

        {/* Main Content */}
        <main className="pb-16 md:pb-0">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/dineout" element={<DineOutPage searchQuery={searchQuery} />} />
            <Route path="/food-delivery" element={<FoodDeliveryPage searchQuery={searchQuery} />} />
            <Route path="/instamart" element={<InstaMartPage searchQuery={searchQuery} />} />
            
            {/* Protected Routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/profile-mobile" element={
              <ProtectedRoute>
                <MobileProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            } />
            <Route path="/addresses" element={
              <ProtectedRoute>
                <AddressesPage />
              </ProtectedRoute>
            } />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/order-success/:orderId" element={
              <ProtectedRoute>
                <OrderSuccessPage />
              </ProtectedRoute>
            } />
            <Route path="/track-order/:orderId" element={
              <ProtectedRoute>
                <OrderTrackingPage />
              </ProtectedRoute>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer - Show on all pages except login/register */}
        <Routes>
          <Route path="/login" element={null} />
          <Route path="/register" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>

        {/* Bottom Navigation - Show on mobile for main pages */}
        <Routes>
          <Route path="/login" element={null} />
          <Route path="/register" element={null} />
          <Route path="/checkout" element={null} />
          <Route path="/order-success/*" element={null} />
          <Route path="/track-order/*" element={null} />
          <Route path="*" element={<BottomNavigationBar />} />
        </Routes>

        {/* Sidebars */}
        <CartSidebar />
        <WishlistSidebar isOpen={isWishlistOpen} setIsOpen={setIsWishlistOpen} />
      </div>
    </Router>
  );
}

export default App;