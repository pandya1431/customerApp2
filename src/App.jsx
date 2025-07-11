import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import layout
import MainLayout from './components/layout/MainLayout';

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
import MobileProfilePage from './components/common/MobileProfilePage';

// Import hooks
import { useAuth } from './hooks/useAuth';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated } = useAuth();

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
        
        <Routes>
          {/* Pages without MainLayout (Login, Register, Checkout, etc.) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/order-success/:orderId" 
            element={
              <ProtectedRoute>
                <OrderSuccessPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/track-order/:orderId" 
            element={
              <ProtectedRoute>
                <OrderTrackingPage />
              </ProtectedRoute>
            } 
          />

          {/* Pages with MainLayout */}
          <Route 
            path="/*" 
            element={
              <MainLayout 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery}
              >
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/dineout" element={<DineOutPage searchQuery={searchQuery} />} />
                  <Route path="/food-delivery" element={<FoodDeliveryPage searchQuery={searchQuery} />} />
                  <Route path="/instamart" element={<InstaMartPage searchQuery={searchQuery} />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  
                  {/* Protected Routes */}
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile-mobile" 
                    element={
                      <ProtectedRoute>
                        <MobileProfilePage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/orders" 
                    element={
                      <ProtectedRoute>
                        <OrdersPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/addresses" 
                    element={
                      <ProtectedRoute>
                        <AddressesPage />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Catch all route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </MainLayout>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;