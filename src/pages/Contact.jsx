import { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 mt-16 md:mt-20">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Liên hệ với chúng tôi</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Contact Form */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Gửi tin nhắn</h2>
            <ContactForm />
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          {/* Contact Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông tin liên hệ</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <FiMapPin className="text-primary-500" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Địa chỉ</h3>
                  <p className="text-gray-600">
                    123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <FiPhone className="text-primary-500" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Điện thoại</h3>
                  <p className="text-gray-600">
                    <a href="tel:19001234" className="hover:text-primary-500">
                      1900 1234
                    </a>
                    <br />
                    <a href="tel:0912345678" className="hover:text-primary-500">
                      0912 345 678
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <FiMail className="text-primary-500" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                  <p className="text-gray-600">
                    <a
                      href="mailto:contact@litebay.vn"
                      className="hover:text-primary-500"
                    >
                      contact@litebay.vn
                    </a>
                    <br />
                    <a
                      href="mailto:support@litebay.vn"
                      className="hover:text-primary-500"
                    >
                      support@litebay.vn
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <FiClock className="text-primary-500" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Giờ làm việc</h3>
                  <p className="text-gray-600">
                    Thứ 2 - Thứ 6: 8:00 - 18:00
                    <br />
                    Thứ 7 - Chủ nhật: 9:00 - 17:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Mạng xã hội</h2>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Facebook</span>
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <span>Zalo</span>
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.126887489123!2d106.62966331480078!3d10.823111392304447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752a3b5e8b3b3b%3A0x4b0b3b3b3b3b3b3b!2zVHLhuqduIFBow7ogVGjhu6cgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Litebay Location"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

