import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('grooso-wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('grooso-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    setWishlist(prevWishlist => {
      const existingItem = prevWishlist.find(item => item.id === product.id);
      if (existingItem) {
        toast.error('Item already in wishlist');
        return prevWishlist;
      }
      toast.success('Added to wishlist');
      return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => {
      const filtered = prevWishlist.filter(item => item.id !== productId);
      toast.success('Removed from wishlist');
      return filtered;
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast.success('Wishlist cleared');
  };

  const getWishlistCount = () => {
    return wishlist.length;
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount,
    toggleWishlist
  };
};