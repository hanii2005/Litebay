import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiCalendar, FiEye, FiShare2, FiFacebook, FiTwitter } from 'react-icons/fi';
import { formatDate } from '../utils/format';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    fetch('/data/news.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(n => n.id === parseInt(id));
        if (found) {
          setNews(found);
          // Get related news (same category, exclude current)
          const related = data
            .filter(n => n.category === found.category && n.id !== found.id)
            .slice(0, 3);
          setRelatedNews(related);
        } else {
          navigate('/news');
        }
      })
      .catch(err => {
        console.error('Error loading news:', err);
        navigate('/news');
      });
  }, [id, navigate]);

  if (!news) {
    return (
      <div className="container mx-auto px-4 py-12 mt-16 md:mt-20">
        <div className="text-center">Đang tải...</div>
      </div>
    );
  }

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = news.title;
    const text = news.excerpt;

    if (platform === 'facebook') {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        '_blank'
      );
    } else if (platform === 'twitter') {
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        '_blank'
      );
    } else {
      navigator.clipboard.writeText(url);
      alert('Đã sao chép link!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 mt-16 md:mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-4 sm:mb-6 text-xs sm:text-sm">
          <Link to="/" className="text-primary-500 hover:text-primary-600">
            Trang chủ
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/news" className="text-primary-500 hover:text-primary-600">
            Tin tức
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{news.title}</span>
        </nav>

        {/* Article Header */}
        <div className="mb-8">
          <span className="inline-block bg-primary-500 text-white px-3 py-1 rounded text-sm font-semibold mb-4">
            {news.category}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">{news.title}</h1>
          <div className="flex items-center space-x-4 text-gray-600 mb-6">
            <div className="flex items-center space-x-1">
              <FiCalendar />
              <span>{formatDate(news.date)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiEye />
              <span>{news.views} lượt xem</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>Tác giả: {news.author}</span>
            </div>
          </div>
        </div>

          {/* Featured Image */}
          <div className="mb-6 sm:mb-8">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-48 sm:h-64 md:h-96 object-cover rounded-lg"
            />
          </div>

        {/* Article Content */}
        <div className="prose max-w-none mb-8">
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {news.content}
          </div>
        </div>

        {/* Share Buttons */}
        <div className="border-t border-b border-gray-200 py-6 mb-8">
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-gray-700">Chia sẻ:</span>
            <button
              onClick={() => handleShare('facebook')}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors touch-manipulation min-h-[44px] text-sm sm:text-base"
            >
              <FiFacebook size={18} />
              <span>Facebook</span>
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2.5 sm:py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors touch-manipulation min-h-[44px] text-sm sm:text-base"
            >
              <FiTwitter size={18} />
              <span>Twitter</span>
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2.5 sm:py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors touch-manipulation min-h-[44px] text-sm sm:text-base"
            >
              <FiShare2 size={18} />
              <span className="hidden sm:inline">Sao chép link</span>
              <span className="sm:hidden">Copy</span>
            </button>
          </div>
        </div>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Tin tức liên quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {relatedNews.map((item) => (
                <Link
                  key={item.id}
                  to={`/news/${item.id}`}
                  className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsDetail;

