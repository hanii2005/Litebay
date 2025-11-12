import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiStar, FiHeart, FiShare2, FiShoppingCart, FiMinus, FiPlus } from 'react-icons/fi';
import { formatCurrency, calculateDiscount } from '../utils/format';
import { useCartStore } from '../store/useCartStore';
import { wishlistStorage } from '../utils/storage';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCartStore();

  useEffect(() => {
    fetch('/data/products.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id === parseInt(id));
        if (found) {
          setProduct(found);
          setIsWishlisted(wishlistStorage.isInWishlist(found.id));
        } else {
          navigate('/products');
        }
      })
      .catch(err => {
        console.error('Error loading product:', err);
        navigate('/products');
      });
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 mt-16 md:mt-20">
        <div className="text-center">Đang tải...</div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
  };

  const handleToggleWishlist = () => {
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Đã sao chép link!');
    }
  };

  const discount = calculateDiscount(product.originalPrice, product.price);
  const images = product.images || [product.image];

  return (
    <div className="container mx-auto px-4 py-8 mt-16 md:mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Images */}
        <div>
          <div className="mb-4">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'border-primary-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            {product.new && (
              <span className="bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold">
                Mới
              </span>
            )}
            {product.featured && (
              <span className="bg-primary-500 text-white px-3 py-1 rounded text-sm font-semibold">
                Nổi bật
              </span>
            )}
            {discount > 0 && (
              <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
                -{discount}%
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <FiStar className="text-yellow-400 fill-yellow-400" size={20} />
              <span className="ml-2 text-lg font-semibold">{product.rating}</span>
              <span className="ml-1 text-gray-600">({product.reviews} đánh giá)</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-3 sm:space-x-4 mb-2 flex-wrap">
              <span className="text-2xl sm:text-3xl font-bold text-primary-500">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-lg sm:text-xl text-gray-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">
              Còn lại: <span className="font-semibold">{product.stock}</span> sản phẩm
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Mô tả sản phẩm</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số lượng
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="p-3 sm:p-2 border border-gray-300 rounded-lg hover:bg-gray-100 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Giảm số lượng"
              >
                <FiMinus size={20} />
              </button>
              <span className="text-lg font-semibold w-16 sm:w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                className="p-3 sm:p-2 border border-gray-300 rounded-lg hover:bg-gray-100 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Tăng số lượng"
              >
                <FiPlus size={20} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary-500 text-white py-3.5 sm:py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors font-semibold flex items-center justify-center space-x-2 text-sm sm:text-base touch-manipulation min-h-[44px]"
            >
              <FiShoppingCart size={20} />
              <span>Thêm vào giỏ hàng</span>
            </button>
            <button
              onClick={handleToggleWishlist}
              className={`px-4 sm:px-6 py-3.5 sm:py-3 rounded-lg border-2 transition-colors flex items-center justify-center space-x-2 touch-manipulation min-h-[44px] text-sm sm:text-base ${
                isWishlisted
                  ? 'border-red-500 text-red-500 bg-red-50'
                  : 'border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-500'
              }`}
            >
              <FiHeart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
              <span className="hidden sm:inline">{isWishlisted ? 'Đã yêu thích' : 'Yêu thích'}</span>
              <span className="sm:hidden">{isWishlisted ? 'Đã thích' : 'Thích'}</span>
            </button>
            <button
              onClick={handleShare}
              className="px-4 sm:px-6 py-3.5 sm:py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-500 transition-colors flex items-center justify-center space-x-2 touch-manipulation min-h-[44px] text-sm sm:text-base"
            >
              <FiShare2 size={18} />
              <span className="hidden sm:inline">Chia sẻ</span>
              <span className="sm:hidden">Share</span>
            </button>
          </div>

          {/* Category */}
          <div className="text-sm text-gray-600">
            Danh mục: <span className="font-semibold">{product.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

