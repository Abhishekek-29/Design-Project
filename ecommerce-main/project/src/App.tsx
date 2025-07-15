import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Check } from 'lucide-react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ProductProvider } from './contexts/ProductContext';
import { OrderProvider } from './contexts/OrderContext';
import { useAuth } from './contexts/AuthContext';
import { useProducts } from './contexts/ProductContext';
import Header from './components/common/Header';
import HeroSection from './components/home/HeroSection';
import CategorySection from './components/home/CategorySection';
import FeaturedProducts from './components/home/FeaturedProducts';
import ProductCard from './components/common/ProductCard';
import FilterSidebar from './components/filters/FilterSidebar';
import LoadingSpinner from './components/common/LoadingSpinner';
import AuthModal from './components/auth/AuthModal';
import CartModal from './components/cart/CartModal';
import CheckoutForm from './components/checkout/CheckoutForm';
import ProfileModal from './components/profile/ProfileModal';
import ProductModal from './components/product/ProductModal';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
  brand: string;
  tags: string[];
  featured: boolean;
}

type ViewMode = 'home' | 'products' | 'checkout' | 'success';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const { products, categories, loading, searchProducts, getFeaturedProducts, getProductsByCategory } = useProducts();
  
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  
  // Filter states
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [stockFilter, setStockFilter] = useState<boolean>(false);

  useEffect(() => {
    if (currentView === 'products') {
      let filtered = searchQuery ? searchProducts(searchQuery) : products;
      
      // Apply category filter
      if (categoryFilter) {
        filtered = filtered.filter(p => p.category === categoryFilter);
      }
      
      // Apply price filter
      filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);
      
      // Apply rating filter
      if (ratingFilter > 0) {
        filtered = filtered.filter(p => p.rating >= ratingFilter);
      }
      
      // Apply stock filter
      if (stockFilter) {
        filtered = filtered.filter(p => p.stock > 0);
      }
      
      setFilteredProducts(filtered);
    }
  }, [currentView, searchQuery, products, categoryFilter, priceRange, ratingFilter, stockFilter]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentView('products');
  };

  const handleCategoryClick = (category: string) => {
    setCategoryFilter(category);
    setCurrentView('products');
  };

  const handleShopNow = () => {
    setCurrentView('products');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCheckout = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setCurrentView('checkout');
  };

  const handleOrderSuccess = (orderId: string) => {
    setOrderSuccess(orderId);
    setCurrentView('success');
  };

  const handleBackToShopping = () => {
    setCurrentView('products');
    setOrderSuccess(null);
  };

  const clearFilters = () => {
    setCategoryFilter(null);
    setPriceRange({ min: 0, max: 1000 });
    setRatingFilter(0);
    setStockFilter(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearch={handleSearch}
        onCartClick={() => setIsCartModalOpen(true)}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onProfileClick={() => setIsProfileModalOpen(true)}
      />

      <main>
        {currentView === 'home' && (
          <>
            <HeroSection onShopNow={handleShopNow} />
            <CategorySection categories={categories} onCategoryClick={handleCategoryClick} />
            <FeaturedProducts products={getFeaturedProducts()} onProductClick={handleProductClick} />
          </>
        )}

        {currentView === 'products' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                {categoryFilter ? `${categoryFilter} Products` : 'All Products'}
              </h1>
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>

            <div className="flex gap-8">
              <div className="hidden lg:block">
                <FilterSidebar
                  categories={categories}
                  onCategoryFilter={setCategoryFilter}
                  onPriceFilter={(min, max) => setPriceRange({ min, max })}
                  onRatingFilter={setRatingFilter}
                  onStockFilter={setStockFilter}
                  onClearFilters={clearFilters}
                  isOpen={isFilterOpen}
                  onClose={() => setIsFilterOpen(false)}
                />
              </div>

              <div className="flex-1">
                <div className="mb-6">
                  <p className="text-gray-600">
                    Showing {filteredProducts.length} of {products.length} products
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onProductClick={handleProductClick}
                    />
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No products found</p>
                    <p className="text-gray-400">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentView === 'checkout' && (
          <CheckoutForm
            onBack={() => setCurrentView('products')}
            onSuccess={handleOrderSuccess}
          />
        )}

        {currentView === 'success' && (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Successful!</h1>
            <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
            <p className="text-gray-600 mb-8">Order ID: #{orderSuccess}</p>
            <button
              onClick={handleBackToShopping}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </main>

      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        categories={categories}
        onCategoryFilter={setCategoryFilter}
        onPriceFilter={(min, max) => setPriceRange({ min, max })}
        onRatingFilter={setRatingFilter}
        onStockFilter={setStockFilter}
        onClearFilters={clearFilters}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* Modals */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        onCheckout={handleCheckout}
      />
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <OrderProvider>
            <AppContent />
          </OrderProvider>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;