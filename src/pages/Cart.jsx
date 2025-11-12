import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import { useCartStore } from '../store/useCartStore';
import { formatCurrency } from '../utils/format';
import { toast } from 'react-toastify';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();
  const shippingFee = totalPrice > 2000000 ? 0 : 50000;
  const finalTotal = totalPrice + shippingFee;

  const handleRemoveItem = (productId) => {
    removeItem(productId);
    toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 mt-16 md:mt-20">
        <div className="text-center py-12">
          <FiShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Giỏ hàng trống</h2>
          <p className="text-gray-600 mb-6">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <Link
            to="/products"
            className="inline-block bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 mt-16 md:mt-20">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Giỏ hàng</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {items.map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-200 last:border-b-0 p-4 flex flex-col sm:flex-row gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-primary-500 font-bold mb-2">
                    {formatCurrency(item.price)}
                  </p>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="flex items-center space-x-1 sm:space-x-2 border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-2.5 sm:p-2 hover:bg-gray-100 touch-manipulation min-w-[40px] min-h-[40px] flex items-center justify-center"
                        aria-label="Giảm số lượng"
                      >
                        <FiMinus size={18} />
                      </button>
                      <span className="px-3 sm:px-4 py-2 font-semibold text-sm sm:text-base min-w-[40px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-2.5 sm:p-2 hover:bg-gray-100 touch-manipulation min-w-[40px] min-h-[40px] flex items-center justify-center"
                        aria-label="Tăng số lượng"
                      >
                        <FiPlus size={18} />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-2.5 sm:p-2 text-red-500 hover:bg-red-50 rounded-lg touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                      aria-label="Xóa sản phẩm"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <button
              onClick={() => {
                clearCart();
                toast.success('Đã xóa tất cả sản phẩm');
              }}
              className="text-red-500 hover:text-red-600 font-medium"
            >
              Xóa tất cả
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tóm tắt đơn hàng</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính:</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển:</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-green-500">Miễn phí</span>
                  ) : (
                    formatCurrency(shippingFee)
                  )}
                </span>
              </div>
              {totalPrice < 2000000 && (
                <p className="text-sm text-gray-500">
                  Mua thêm {formatCurrency(2000000 - totalPrice)} để được miễn phí vận chuyển
                </p>
              )}
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Tổng cộng:</span>
                  <span className="text-primary-500">{formatCurrency(finalTotal)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary-500 text-white py-3.5 sm:py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold text-sm sm:text-base touch-manipulation min-h-[48px]"
            >
              Thanh toán
            </button>
            <Link
              to="/products"
              className="block text-center mt-4 text-primary-500 hover:text-primary-600 font-medium"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

