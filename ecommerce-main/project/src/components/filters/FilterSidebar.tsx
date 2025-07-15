import React, { useState } from 'react';
import { Filter, X, Star, DollarSign, Package, Tag } from 'lucide-react';

interface FilterSidebarProps {
  categories: string[];
  onCategoryFilter: (category: string | null) => void;
  onPriceFilter: (min: number, max: number) => void;
  onRatingFilter: (rating: number) => void;
  onStockFilter: (inStock: boolean) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  onCategoryFilter,
  onPriceFilter,
  onRatingFilter,
  onStockFilter,
  onClearFilters,
  isOpen,
  onClose
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState(false);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    onCategoryFilter(category);
  };

  const handlePriceChange = () => {
    onPriceFilter(priceRange.min, priceRange.max);
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    onRatingFilter(rating);
  };

  const handleStockChange = (inStock: boolean) => {
    setInStockOnly(inStock);
    onStockFilter(inStock);
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setPriceRange({ min: 0, max: 1000 });
    setSelectedRating(0);
    setInStockOnly(false);
    onClearFilters();
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        </div>
        <button
          onClick={handleClearFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="flex items-center space-x-2 font-medium text-gray-800 mb-3">
            <Tag className="h-4 w-4" />
            <span>Categories</span>
          </h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === null}
                onChange={() => handleCategoryChange(null)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">All Categories</span>
            </label>
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => handleCategoryChange(category)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="flex items-center space-x-2 font-medium text-gray-800 mb-3">
            <DollarSign className="h-4 w-4" />
            <span>Price Range</span>
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={handlePriceChange}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Rating */}
        <div>
          <h3 className="flex items-center space-x-2 font-medium text-gray-800 mb-3">
            <Star className="h-4 w-4" />
            <span>Rating</span>
          </h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={selectedRating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <div className="flex items-center space-x-1">
                  {renderStars(rating)}
                  <span className="text-sm text-gray-600">& up</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Stock */}
        <div>
          <h3 className="flex items-center space-x-2 font-medium text-gray-800 mb-3">
            <Package className="h-4 w-4" />
            <span>Availability</span>
          </h3>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => handleStockChange(e.target.checked)}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">In Stock Only</span>
          </label>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>

          {sidebarContent}
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;