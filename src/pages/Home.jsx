import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BannerSlider from '../components/BannerSlider';
import ProductCard from '../components/ProductCard';
import NewsCard from '../components/NewsCard';
import { visitCounter } from '../utils/storage';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [news, setNews] = useState([]);
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    // Increment visit counter
    visitCounter.increment();
    setVisitCount(visitCounter.get());

    // Load products
    fetch('/data/products.json')
      .then(res => res.json())
      .then(data => {
        setFeaturedProducts(data.filter(p => p.featured).slice(0, 6));
        setNewProducts(data.filter(p => p.new).slice(0, 6));
      })
      .catch(err => console.error('Error loading products:', err));

    // Load news
    fetch('/data/news.json')
      .then(res => res.json())
      .then(data => setNews(data.slice(0, 3)))
      .catch(err => console.error('Error loading news:', err));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Banner Slider */}
      <BannerSlider />

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Sản phẩm nổi bật</h2>
          <Link
            to="/products?featured=true"
            className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
          >
            Xem tất cả →
          </Link>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      {/* New Products */}
      <section className="bg-gray-50 py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-6 sm:mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Sản phẩm mới</h2>
            <Link
              to="/products?new=true"
              className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
            >
              Xem tất cả →
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {newProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Tin tức mới nhất</h2>
          <Link
            to="/news"
            className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
          >
            Xem tất cả →
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <NewsCard news={item} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Visit Counter - Thu nhỏ */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-gray-100 py-4"
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            Lượt truy cập: <span className="font-semibold text-primary-500">{visitCount.toLocaleString('vi-VN')}</span>
          </p>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;

