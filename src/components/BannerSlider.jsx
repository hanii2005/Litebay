import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const BannerSlider = () => {
  const banners = [
    {
      id: 1,
      title: 'Khuyến mãi đặc biệt tháng 1',
      subtitle: 'Giảm giá lên đến 50%',
      image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200',
      link: '/products?promo=true'
    },
    {
      id: 2,
      title: 'Sản phẩm mới 2024',
      subtitle: 'Khám phá công nghệ mới nhất',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200',
      link: '/products?new=true'
    },
    {
      id: 3,
      title: 'Miễn phí vận chuyển',
      subtitle: 'Cho đơn hàng trên 2 triệu đồng',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
      link: '/products'
    }
  ];

  return (
    <div className="relative w-full h-56 sm:h-64 md:h-96 lg:h-[500px] mt-16 md:mt-20">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-full">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
                    {banner.title}
                  </h2>
                  <p className="text-base sm:text-xl md:text-2xl mb-4 sm:mb-6">{banner.subtitle}</p>
                  <a
                    href={banner.link}
                    className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base touch-manipulation min-h-[44px] flex items-center justify-center"
                  >
                    Mua ngay
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;

