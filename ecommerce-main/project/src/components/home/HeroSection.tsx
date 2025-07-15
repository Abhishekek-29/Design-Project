import React from 'react';
import { ArrowRight, ShoppingBag, Star, Truck } from 'lucide-react';

interface HeroSectionProps {
  onShopNow: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onShopNow }) => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Shop the Best
                <span className="block text-orange-400">Products Online</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-lg">
                Discover amazing deals on premium products with fast shipping and secure payments.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onShopNow}
                className="flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Shop Now</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="flex items-center justify-center space-x-2 border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                <span>Learn More</span>
              </button>
            </div>

            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-sm">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-green-400" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5 text-blue-300" />
                <span className="text-sm">1M+ Products</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform rotate-3">
                  <img
                    src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1"
                    alt="Electronics"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <p className="text-sm font-medium mt-2">Electronics</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform -rotate-2">
                  <img
                    src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1"
                    alt="Fashion"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <p className="text-sm font-medium mt-2">Fashion</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform -rotate-1">
                  <img
                    src="https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1"
                    alt="Home"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <p className="text-sm font-medium mt-2">Home & Garden</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform rotate-2">
                  <img
                    src="https://images.pexels.com/photos/3822356/pexels-photo-3822356.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1"
                    alt="Sports"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <p className="text-sm font-medium mt-2">Sports</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;