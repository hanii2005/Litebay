import { FiTarget, FiEye, FiUsers, FiAward } from 'react-icons/fi';
import { motion } from 'framer-motion';

const About = () => {
  const values = [
    {
      icon: <FiTarget size={48} />,
      title: 'Tầm nhìn',
      description: 'Trở thành nền tảng thương mại điện tử hàng đầu Việt Nam, mang đến trải nghiệm mua sắm tốt nhất cho khách hàng.'
    },
    {
      icon: <FiEye size={48} />,
      title: 'Sứ mệnh',
      description: 'Cung cấp sản phẩm chất lượng với giá cả hợp lý, dịch vụ chuyên nghiệp và cam kết đáp ứng mọi nhu cầu của khách hàng.'
    },
    {
      icon: <FiUsers size={48} />,
      title: 'Giá trị cốt lõi',
      description: 'Đặt khách hàng làm trung tâm, minh bạch trong mọi giao dịch, và không ngừng đổi mới để phục vụ tốt hơn.'
    },
    {
      icon: <FiAward size={48} />,
      title: 'Cam kết',
      description: 'Sản phẩm chính hãng, bảo hành đầy đủ, giao hàng nhanh chóng và hỗ trợ khách hàng 24/7.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-12 sm:py-16 md:py-20 mt-16 md:mt-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 font-display"
          >
            Về Litebay
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto px-4"
          >
            Thương mại điện tử hàng đầu, mang đến trải nghiệm mua sắm tuyệt vời
          </motion.p>
        </div>
      </section>

      {/* About Content */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose max-w-none mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Giới thiệu</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Litebay được thành lập với mục tiêu trở thành nền tảng thương mại điện tử hàng đầu tại Việt Nam.
              Chúng tôi chuyên cung cấp các sản phẩm công nghệ, điện tử chất lượng cao với giá cả hợp lý.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Với đội ngũ nhân viên chuyên nghiệp và tận tâm, chúng tôi cam kết mang đến cho khách hàng
              những trải nghiệm mua sắm tốt nhất. Từ việc tư vấn sản phẩm phù hợp đến dịch vụ hậu mãi chu đáo,
              mọi thứ đều được chúng tôi chăm chút kỹ lưỡng.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Litebay không chỉ là nơi mua sắm, mà còn là đối tác tin cậy của bạn trong hành trình khám phá
              công nghệ và nâng cao chất lượng cuộc sống.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-primary-500 mb-4"
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Team Section */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Đội ngũ của chúng tôi</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Đội ngũ Litebay bao gồm những chuyên gia giàu kinh nghiệm trong lĩnh vực thương mại điện tử,
              công nghệ thông tin và dịch vụ khách hàng. Chúng tôi luôn nỗ lực để mang đến những giá trị
              tốt nhất cho khách hàng.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <FiUsers size={48} className="text-gray-400" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Thành viên {i}</h4>
                  <p className="text-sm text-gray-600">Chuyên viên tư vấn</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-primary-50 rounded-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-500 mb-2">10K+</div>
                <div className="text-gray-600">Khách hàng</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-500 mb-2">5K+</div>
                <div className="text-gray-600">Sản phẩm</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-500 mb-2">98%</div>
                <div className="text-gray-600">Hài lòng</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-500 mb-2">24/7</div>
                <div className="text-gray-600">Hỗ trợ</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

