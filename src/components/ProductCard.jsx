import { Link } from 'react-router-dom';
import { FiStar, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { formatCurrency, calculateDiscount } from '../utils/format';
import { useCartStore } from '../store/useCartStore';
import { wishlistStorage } from '../utils/storage';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ProductCard = ({ product, index = 0 }) => {
  const { addItem } = useCartStore();
  const [isWishlisted, setIsWishlisted] = useState(
    wishlistStorage.isInWishlist(product.id)
  );

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success('Đã thêm vào giỏ hàng!');
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      wishlistStorage.remove(product.id);
      setIsWishlisted(false);
      toast.info('Đã xóa khỏi yêu thích');
    } else {
      wishlistStorage.add(product.id);
      setIsWishlisted(true);
      toast.success('Đã thêm vào yêu thích');
    }
  };

  const discount = calculateDiscount(product.originalPrice, product.price);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden block"
      >
        <div className="relative">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          {product.new && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold"
            >
              Mới
            </motion.span>
          )}
          {product.featured && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 right-2 bg-primary-500 text-white px-2 py-1 rounded text-xs font-semibold"
            >
              Nổi bật
            </motion.span>
          )}
          {discount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold"
            >
              -{discount}%
            </motion.span>
          )}
          <motion.button
            onClick={handleToggleWishlist}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`absolute bottom-2 right-2 p-2.5 sm:p-2 rounded-full bg-white shadow-md hover:bg-primary-500 hover:text-white transition-colors touch-manipulation ${
              isWishlisted ? 'text-red-500' : 'text-gray-600'
            }`}
            aria-label="Thêm vào yêu thích"
          >
            <FiHeart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
          </motion.button>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center space-x-1 mb-2">
            <div className="flex items-center">
              <FiStar className="text-yellow-400 fill-yellow-400" size={16} />
              <span className="text-sm text-gray-600 ml-1">
                {product.rating} ({product.reviews})
              </span>
            </div>
          </div>

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
            onClick={handleAddToCart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary-500 text-white py-2.5 sm:py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium text-sm sm:text-base touch-manipulation"
          >
            Thêm vào giỏ
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
