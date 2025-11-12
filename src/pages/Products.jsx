import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    search: searchParams.get('search') || ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    // Load products
    fetch('/data/products.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        applyFilters(data, filters);
      })
      .catch(err => console.error('Error loading products:', err));

    // Load categories
    fetch('/data/categories.json')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error loading categories:', err));

    // Check URL params
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const newProducts = searchParams.get('new');
    const promo = searchParams.get('promo');

    if (search) {
      setFilters(prev => ({ ...prev, search }));
    }
  }, [searchParams]);

  const applyFilters = (productList, filterValues) => {
    let filtered = [...productList];

    // Search filter
    if (filterValues.search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(filterValues.search.toLowerCase())
      );
    }

    // Category filter
    if (filterValues.category) {
      filtered = filtered.filter(p => p.category === filterValues.category);
    }

    // Price filters
    if (filterValues.minPrice) {
      filtered = filtered.filter(p => p.price >= parseInt(filterValues.minPrice));
    }
    if (filterValues.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseInt(filterValues.maxPrice));
    }

    // URL params
    const featured = searchParams.get('featured');
    const newProducts = searchParams.get('new');
    const promo = searchParams.get('promo');

    if (featured === 'true') {
      filtered = filtered.filter(p => p.featured);
    }
    if (newProducts === 'true') {
      filtered = filtered.filter(p => p.new);
    }
    if (promo === 'true') {
      filtered = filtered.filter(p => p.originalPrice && p.originalPrice > p.price);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters(products, newFilters);
  };

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8 mt-16 md:mt-20">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8"
      >
        Sản phẩm
      </motion.h1>

      <ProductFilter
        categories={categories}
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      {/* Results count */}
      <div className="mb-6 text-gray-600">
        Tìm thấy <span className="font-semibold">{filteredProducts.length}</span> sản phẩm
      </div>

      {/* Products Grid */}
      {paginatedProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 mb-8">
            {paginatedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Trước
              </button>
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 sm:px-4 py-2 border rounded-lg touch-manipulation min-w-[40px] min-h-[40px] text-sm sm:text-base ${
                        currentPage === page
                          ? 'bg-primary-500 text-white border-primary-500'
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page}>...</span>;
                }
                return null;
              })}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 touch-manipulation min-h-[40px] text-sm sm:text-base"
              >
                Sau
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào</p>
        </div>
      )}
    </div>
  );
};

export default Products;

