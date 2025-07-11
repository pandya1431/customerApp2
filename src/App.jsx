import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import BottomNavigationBar from './components/common/BottomNavigationBar';
import CartSidebar from './components/cart/CartSidebar';
import HomePage from './pages/HomePage';
import DineOutPage from './pages/DineOutPage';
import FoodDeliveryPage from './pages/FoodDeliveryPage';
import InstaMartPage from './pages/InstaMartPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import AddressesPage from './pages/AddressesPage';
import SearchPage from './pages/SearchPage';
import CategoriesPage from './pages/CategoriesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import AccountPage from './pages/AccountPage';
import { useAuth } from './hooks/useAuth';
import LoadingSpinner from './components/common/LoadingSpinner';
import MobileProfilePage from './components/common/MobileProfilePage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Layout Component
const Layout = ({ children, onSearchChange }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
      <Header onSearchChange={onSearchChange} />
      <main className="flex-1">
        {children}
      </main>
      <div className="hidden md:block">
        <Footer />
      </div>
      <CartSidebar />
      <Toaster 
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#10b981',
            color: '#fff',
          },
        }}
      />
      {/* Bottom Navigation - Only show on mobile */}
      <div className="md:hidden">
        <BottomNavigationBar />
      </div>
    </div>
  );
};

function App() {
  const { isLoading } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState('');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Initializing Grooso..." />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Mobile Profile Page */}
        <Route
          path="/profile-mobile"
          element={
            <div className="md:hidden">
              <MobileProfilePage />
            </div>
          }
        />
        
        {/* Search and Categories */}
        <Route
          path="/search"
          element={
            <Layout>
              <SearchPage />
            </Layout>
          }
        />
        
        <Route
          path="/categories"
          element={
            <Layout>
              <CategoriesPage />
            </Layout>
          }
        />
        
        {/* Main Routes with Layout */}
        <Route
          path="/"
          element={
            <Layout onSearchChange={setSearchQuery}>
              <HomePage searchQuery={searchQuery} />
            </Layout>
          }
        />
        
        {/* Service-specific routes */}
        <Route
          path="/dineout"
          element={
            <Layout onSearchChange={setSearchQuery}>
              <DineOutPage searchQuery={searchQuery} />
            </Layout>
          }
        />
        
        <Route
          path="/food-delivery"
          element={
            <Layout onSearchChange={setSearchQuery}>
              <FoodDeliveryPage searchQuery={searchQuery} />
            </Layout>
          }
        />
        
        <Route
          path="/instamart"
          element={
            <Layout onSearchChange={setSearchQuery}>
              <InstaMartPage searchQuery={searchQuery} />
            </Layout>
          }
        />

        {/* Cart and Checkout */}
        <Route
          path="/cart"
          element={
            <Layout>
              <CartPage />
            </Layout>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Layout>
                <CheckoutPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-success/:orderId"
          element={
            <ProtectedRoute>
              <Layout>
                <OrderSuccessPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/track-order/:orderId"
          element={
            <ProtectedRoute>
              <Layout>
                <OrderTrackingPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        {/* Protected Routes */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Layout>
                <OrdersPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <ProfilePage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/addresses"
          element={
            <ProtectedRoute>
              <Layout>
                <AddressesPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Layout>
                <AccountPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;