import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Zap, Globe, Store, ShoppingCart, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productsApi } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatCurrency } from '../utils/helpers';

const HomePage = ({ searchQuery }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const bannerSlides = [
    {
      title: 'SPECIAL OFFER',
      subtitle: 'UP TO\n50% OFF',
      backgroundImage: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-emerald-400/90 to-emerald-500/90',
      products: [
        { image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=100', alt: 'Shoe' },
        { image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=100', alt: 'Watch' },
        { image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=100', alt: 'Lotion' }
      ]
    },
    {
      title: 'MEGA SALE',
      subtitle: 'UP TO\n70% OFF',
      backgroundImage: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-purple-400/90 to-purple-500/90',
      products: [
        { image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100', alt: 'Headphones' },
        { image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=100', alt: 'Laptop' },
        { image: 'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=100', alt: 'T-shirt' }
      ]
    },
    {
      title: 'FLASH DEALS',
      subtitle: 'UP TO\n60% OFF',
      backgroundImage: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-red-400/90 to-red-500/90',
      products: [
        { image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=100', alt: 'Lamp' },
        { image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=100', alt: 'Watch' },
        { image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=100', alt: 'Tea' }
      ]
    }
  ];

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    if (isTransitioning) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [bannerSlides.length, isTransitioning]);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productsApi.getProducts();
      // Get the first 4 products (which are now the recommended products)
      const featured = response.data.slice(0, 4);
      setFeaturedProducts(featured);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-3 h-3 ${i < fullStars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 md:pb-4">
        {/* Special Offer Banner */}
        <div className="relative rounded-2xl mb-6 overflow-hidden">
          {/* Carousel Container */}
          <div className="relative w-full h-48 md:h-64 lg:h-72">
            {/* Slides */}
            <div 
              className="flex transition-transform duration-300 ease-in-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {bannerSlides.map((slide, index) => (
                <div
                  key={index}
                  className="w-full h-full flex-shrink-0 relative bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}></div>
                  
                  {/* Slide Content */}
                  <div className="relative z-10 p-4 md:p-6 h-full flex justify-between items-start">
                    {/* Left Content */}
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <h2 className="text-white text-sm md:text-lg font-bold mb-2">{slide.title}</h2>
                        <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                          {slide.subtitle.split('\n').map((line, lineIndex) => (
                            <span key={lineIndex}>
                              {line}
                              {lineIndex === 0 && <br />}
                            </span>
                          ))}
                        </h1>
                      </div>
                      
                      {/* Pagination Dots */}
                      <div className="flex space-x-2 mt-4">
                        {bannerSlides.map((_, dotIndex) => (
                          <button
                            key={dotIndex}
                            onClick={() => goToSlide(dotIndex)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              dotIndex === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Right Content - Product Images */}
                    <div className="flex flex-col space-y-2 md:space-y-3">
                      {slide.products.map((product, productIndex) => (
                        <img
                          key={productIndex}
                          src={product.image}
                          alt={product.alt}
                          className={`object-cover rounded-lg shadow-lg ${
                            productIndex === 0 ? 'w-16 h-16 md:w-20 md:h-20' :
                            productIndex === 1 ? 'w-12 h-12 md:w-16 md:h-16' :
                            'w-10 h-10 md:w-12 md:h-12'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
            <button
              onClick={prevSlide}
              disabled={isTransitioning}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-all duration-200 disabled:opacity-50 hidden md:block"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              disabled={isTransitioning}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-all duration-200 disabled:opacity-50 hidden md:block"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Service Categories */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
          <Link
            to="/dineout"
            className="flex flex-col items-center p-4 md:p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
          >
            <Zap className="w-8 h-8 md:w-10 md:h-10 text-emerald-600 mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-sm md:text-base font-medium text-gray-900">Express</span>
          </Link>
          <Link
            to="/instamart"
            className="flex flex-col items-center p-4 md:p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
          >
            <Globe className="w-8 h-8 md:w-10 md:h-10 text-emerald-600 mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-sm md:text-base font-medium text-gray-900">Nationwide</span>
          </Link>
          <Link
            to="/food-delivery"
            className="flex flex-col items-center p-4 md:p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
          >
            <Store className="w-8 h-8 md:w-10 md:h-10 text-emerald-600 mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-sm md:text-base font-medium text-gray-900">City Mart</span>
          </Link>
        </div>

        {/* Recommended Products */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
            Recommended Products
          </h2>

          {loading ? (
            <div className="flex justify-center">
              <LoadingSpinner text="Loading recommended products..." />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg p-3 md:p-4 hover:shadow-lg transition-shadow">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-24 md:h-32 lg:h-36 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-medium text-sm md:text-base text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center space-x-1 mb-2">
                    {product.rating === 5.0 ? (
                      <div className="flex space-x-1">
                        {renderStars(5)}
                      </div>
                    ) : (
                      <>
                        <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" />
                        <span className="text-xs md:text-sm text-gray-600">{product.rating.toFixed(1)}</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm md:text-base font-bold text-gray-900">{formatCurrency(product.price)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Flash Deals */}
        <div>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Flash Deals</h2>
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-6">
            <div className="bg-gradient-to-r from-red-400 to-red-500 rounded-xl p-4 md:p-6 text-white flex flex-col items-center hover:shadow-lg transition-shadow">
              <Zap className="w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3" />
              <span className="text-sm md:text-base font-medium">Flash Deals</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 md:p-6 flex flex-col items-center hover:bg-gray-100 transition-colors">
              <ShoppingCart className="w-6 h-6 md:w-8 md:h-8 text-emerald-600 mb-2 md:mb-3" />
              <span className="text-sm md:text-base font-medium text-gray-900">Grocery</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 md:p-6 flex flex-col items-center hover:bg-gray-100 transition-colors">
              <Coffee className="w-6 h-6 md:w-8 md:h-8 text-emerald-600 mb-2 md:mb-3" />
              <span className="text-sm md:text-base font-medium text-gray-900">Skincare</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;