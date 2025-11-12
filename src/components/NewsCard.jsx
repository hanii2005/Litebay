import { Link } from 'react-router-dom';
import { formatDateShort } from '../utils/format';
import { FiCalendar, FiEye } from 'react-icons/fi';
import { motion } from 'framer-motion';

const NewsCard = ({ news }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={`/news/${news.id}`}
        className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full"
      >
        <div className="relative">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-2 left-2 bg-primary-500 text-white px-3 py-1 rounded text-sm font-semibold">
            {news.category}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
            {news.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{news.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <FiCalendar />
              <span>{formatDateShort(news.date)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiEye />
              <span>{news.views}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default NewsCard;
