import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { wishlistStorage } from '../utils/storage';
import { useCartStore } from '../store/useCartStore';
import { formatCurrency } from '../utils/format';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [products, setProducts] = useState([]);
  const { addItem } = useCartStore();

  useEffect(() => {
    const wishlistIds = wishlistStorage.getAll();
    
    fetch('/data/products.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        const wishlistProducts = data.filter(p => wishlistIds.includes(p.id));
        setWishlistItems(wishlistProducts);
      })
      .catch(err => console.error('Error loading products:', err));
  }, []);

  const handleRemoveFromWishlist = (productId) => {
    wishlistStorage.remove(productId);
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    toast.info('Đã xóa khỏi yêu thích');
  };

  const handleAddToCart = (product) => {
    addItem(product, 1);
    toast.success('Đã thêm vào giỏ hàng!');
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 mt-16 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <FiHeart size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Danh sách yêu thích trống</h2>
          <p className="text-gray-600 mb-6">Bạn chưa có sản phẩm nào trong danh sách yêu thích</p>
          <Link
            to="/products"
            className="inline-block bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold"
          >
            Khám phá sản phẩm
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 mt-16 md:mt-20">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8"
      >
        Danh sách yêu thích ({wishlistItems.length})
      </motion.h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
        {wishlistItems.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <Link to={`/product/${product.id}`} className="block">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveFromWishlist(product.id);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md text-red-500 hover:bg-red-50 transition-colors"
                >
                  <FiHeart size={20} fill="currentColor" />
                </motion.button>
              </div>
            </Link>

            <div className="p-4">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-primary-500 transition-colors">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center space-x-2 mb-3">
                <span className="text-lg font-bold text-primary-500">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>

              <motion.button
                onClick={() => handleAddToCart(product)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary-500 text-white py-2.5 sm:py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center justify-center space-x-2 text-sm sm:text-base touch-manipulation min-h-[44px]"
              >
                <FiShoppingCart size={18} />
                <span>Thêm vào giỏ</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

