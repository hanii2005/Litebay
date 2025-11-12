import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi';
import { useCartStore } from '../store/useCartStore';
import { useUserStore } from '../store/useUserStore';
import { wishlistStorage } from '../utils/storage';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const navigate = useNavigate();
  const { getTotalItems } = useCartStore();
  const { user, isAuthenticated, logout } = useUserStore();
  const totalItems = getTotalItems();

  useEffect(() => {
    setWishlistCount(wishlistStorage.getAll().length);
    const interval = setInterval(() => {
      setWishlistCount(wishlistStorage.getAll().length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Load categories
    fetch('/data/categories.json')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error loading categories:', err));

    // Handle scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl md:text-3xl font-display font-bold text-primary-500 group-hover:text-primary-600 transition-colors">
              Litebay
            </span>
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-primary-500"
              >
                <FiSearch size={20} />
              </button>
            </div>
          </form>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/products" className="text-gray-700 hover:text-primary-500 font-medium">
              Sản phẩm
            </Link>
            <Link to="/news" className="text-gray-700 hover:text-primary-500 font-medium">
              Tin tức
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-500 font-medium">
              Giới thiệu
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-500 font-medium">
              Liên hệ
            </Link>
            <Link to="/wishlist" className="text-gray-700 hover:text-primary-500 font-medium relative">
              Yêu thích
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-500">
                  <FiUser size={20} />
                  <span className="font-medium">{user?.name || 'User'}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-primary-500 border border-primary-500 rounded-lg hover:bg-primary-50 font-medium"
              >
                Đăng nhập
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative">
              <FiShoppingCart size={24} className="text-gray-700 hover:text-primary-500" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg"
              />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
                >
                  <FiSearch size={20} />
                </button>
              </div>
            </form>

            <div className="flex flex-col space-y-2">
              <Link
                to="/products"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg touch-manipulation min-h-[44px] flex items-center"
              >
                Sản phẩm
              </Link>
              <Link
                to="/news"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Tin tức
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Giới thiệu
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Liên hệ
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Yêu thích {wishlistCount > 0 && `(${wishlistCount})`}
              </Link>
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 text-gray-700">
                    Xin chào, {user?.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 text-primary-500 border border-primary-500 rounded-lg text-center"
                >
                  Đăng nhập
                </Link>
              )}
              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center space-x-2"
              >
                <FiShoppingCart size={20} />
                <span>Giỏ hàng {totalItems > 0 && `(${totalItems})`}</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

