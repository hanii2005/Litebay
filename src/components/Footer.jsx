import { Link } from 'react-router-dom';
import { FiFacebook, FiMail, FiPhone, FiMapPin, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-white text-xl font-bold mb-4 font-display">Litebay</h3>
            <p className="text-sm mb-4 leading-relaxed">
              Thương mại điện tử hàng đầu, mang đến trải nghiệm mua sắm tốt nhất với giá cả hợp lý và dịch vụ chuyên nghiệp.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <FiFacebook size={24} />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <FiInstagram size={24} />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <FiTwitter size={24} />
              </motion.a>
              <motion.a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <FiYoutube size={24} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-white text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Policies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-white text-lg font-semibold mb-4">Chính sách</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Chính sách vận chuyển
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Chính sách bảo hành
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-white text-lg font-semibold mb-4">Thông tin liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <FiMapPin className="mt-1 flex-shrink-0 text-primary-400" />
                <span className="text-sm">
                  123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <FiPhone className="text-primary-400" />
                <a href="tel:19001234" className="hover:text-primary-400 transition-colors">
                  1900 1234
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FiMail className="text-primary-400" />
                <a
                  href="mailto:contact@litebay.vn"
                  className="hover:text-primary-400 transition-colors"
                >
                  contact@litebay.vn
                </a>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-sm text-gray-400">
                Giờ làm việc: 8:00 - 22:00 (Tất cả các ngày)
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Hỗ trợ 24/7 qua hotline
              </p>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-gray-800 mt-8 pt-8 text-center text-sm"
        >
          <p>&copy; {currentYear} Litebay. Tất cả quyền được bảo lưu.</p>
          <p className="mt-2 text-gray-500">
            Được phát triển với ❤️ bởi Nhóm 2
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
