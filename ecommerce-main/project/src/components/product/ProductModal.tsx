import React, { useState } from 'react';
import { X, Star, ShoppingCart, Heart, Plus, Minus, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useProducts } from '../../contexts/ProductContext';

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

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { getRecommendations } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specifications' | 'reviews'>('details');

  const recommendations = getRecommendations(product.id);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category
      });
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Premium quality materials</li>
                  <li>• Expert craftsmanship</li>
                  <li>• Satisfaction guaranteed</li>
                  <li>• Fast shipping available</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Care Instructions</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Handle with care</li>
                  <li>• Store in cool, dry place</li>
                  <li>• Clean according to instructions</li>
                  <li>• Avoid extreme temperatures</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'specifications':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Brand:</span>
                  <span className="font-medium">{product.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-medium">{product.rating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stock:</span>
                  <span className="font-medium">{product.stock} available</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">SKU:</span>
                  <span className="font-medium">SKU-{product.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium">1.5 lbs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dimensions:</span>
                  <span className="font-medium">10" x 8" x 6"</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Warranty:</span>
                  <span className="font-medium">1 Year</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'reviews':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                {renderStars(product.rating)}
                <span className="text-lg font-semibold">{product.rating}</span>
              </div>
              <span className="text-gray-600">Based on 127 reviews</span>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'John D.', rating: 5, comment: 'Excellent quality and fast shipping!' },
                { name: 'Sarah M.', rating: 4, comment: 'Great product, exactly as described.' },
                { name: 'Mike R.', rating: 5, comment: 'Highly recommended, will buy again.' }
              ].map((review, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium">{review.name}</span>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)] overflow-y-auto">
          {/* Product Image */}
          <div className="lg:w-1/2 p-6">
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              {product.featured && (
                <span className="absolute top-4 left-4 bg-orange-500 text-white text-sm px-3 py-1 rounded-full">
                  Featured
                </span>
              )}
              <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 p-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">{product.category}</span>
                  <span className="text-sm text-gray-400">{product.brand}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-500">({product.rating})</span>
                </div>
                <span className="text-sm text-gray-500">{product.stock} in stock</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                <span className="text-sm text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    product.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <Truck className="h-6 w-6 text-green-600" />
                  <span className="text-sm text-gray-600">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Shield className="h-6 w-6 text-blue-600" />
                  <span className="text-sm text-gray-600">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <RotateCcw className="h-6 w-6 text-orange-600" />
                  <span className="text-sm text-gray-600">30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t">
          <div className="flex space-x-6 px-6 py-3">
            {[
              { id: 'details', label: 'Details' },
              { id: 'specifications', label: 'Specifications' },
              { id: 'reviews', label: 'Reviews' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-2 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="border-t p-6">
            <h3 className="text-lg font-semibold mb-4">You might also like</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendations.map((rec) => (
                <div key={rec.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                  <img
                    src={rec.image}
                    alt={rec.title}
                    className="w-full h-24 object-cover rounded-lg mb-2"
                  />
                  <h4 className="font-medium text-sm">{rec.title}</h4>
                  <p className="text-xs text-gray-600 mb-1">{rec.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-600">${rec.price}</span>
                    <div className="flex">{renderStars(rec.rating)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;