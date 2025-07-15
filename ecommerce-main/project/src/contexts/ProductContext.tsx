import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

interface ProductContextType {
  products: Product[];
  categories: string[];
  loading: boolean;
  searchProducts: (query: string) => Product[];
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getFeaturedProducts: () => Product[];
  getRecommendations: (productId: string) => Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

const initialProducts: Product[] = [
  {
    id: '1',
    title: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    price: 299.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
    category: 'Electronics',
    rating: 4.8,
    stock: 50,
    brand: 'AudioTech',
    tags: ['wireless', 'noise-cancelling', 'premium'],
    featured: true
  },
  {
    id: '2',
    title: 'Smartphone Pro Max',
    description: 'Latest smartphone with advanced camera system and powerful processor.',
    price: 999.99,
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
    category: 'Electronics',
    rating: 4.9,
    stock: 30,
    brand: 'TechCorp',
    tags: ['smartphone', 'camera', 'flagship'],
    featured: true
  },
  {
    id: '3',
    title: 'Designer Leather Jacket',
    description: 'Premium leather jacket with modern design and superior craftsmanship.',
    price: 399.99,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
    category: 'Fashion',
    rating: 4.7,
    stock: 20,
    brand: 'StyleCo',
    tags: ['leather', 'designer', 'jacket'],
    featured: false
  },
  {
    id: '4',
    title: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring and GPS capabilities.',
    price: 199.99,
    image: 'https://images.pexels.com/photos/1334598/pexels-photo-1334598.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
    category: 'Electronics',
    rating: 4.6,
    stock: 75,
    brand: 'FitTech',
    tags: ['smartwatch', 'fitness', 'gps'],
    featured: true
  },
  {
    id: '5',
    title: 'Organic Coffee Beans',
    description: 'Premium organic coffee beans sourced from sustainable farms.',
    price: 24.99,
    image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
    category: 'Food',
    rating: 4.5,
    stock: 100,
    brand: 'BrewMaster',
    tags: ['organic', 'coffee', 'sustainable'],
    featured: false
  },
  {
    id: '6',
    title: 'Gaming Mechanical Keyboard',
    description: 'High-performance mechanical keyboard designed for gaming enthusiasts.',
    price: 149.99,
    image: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
    category: 'Electronics',
    rating: 4.7,
    stock: 40,
    brand: 'GameGear',
    tags: ['gaming', 'mechanical', 'keyboard'],
    featured: false
  },
  {
    id: '7',
    title: 'Minimalist Desk Lamp',
    description: 'Modern LED desk lamp with adjustable brightness and sleek design.',
    price: 89.99,
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
    category: 'Home',
    rating: 4.4,
    stock: 60,
    brand: 'LightCo',
    tags: ['led', 'desk', 'minimalist'],
    featured: true
  },
  {
    id: '8',
    title: 'Yoga Mat Premium',
    description: 'High-quality yoga mat with superior grip and cushioning.',
    price: 59.99,
    image: 'https://images.pexels.com/photos/3822356/pexels-photo-3822356.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
    category: 'Sports',
    rating: 4.6,
    stock: 80,
    brand: 'ZenFit',
    tags: ['yoga', 'fitness', 'mat'],
    featured: false
  }
];

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProducts = localStorage.getItem('shopzing_products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('shopzing_products', JSON.stringify(initialProducts));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    setCategories(uniqueCategories);
  }, [products]);

  const searchProducts = (query: string): Product[] => {
    if (!query.trim()) return products;
    
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product =>
      product.title.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      product.brand.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: string): Product[] => {
    return products.filter(product => product.category === category);
  };

  const getFeaturedProducts = (): Product[] => {
    return products.filter(product => product.featured);
  };

  const getRecommendations = (productId: string): Product[] => {
    const product = getProductById(productId);
    if (!product) return [];

    // Content-based filtering
    const recommendations = products
      .filter(p => p.id !== productId)
      .map(p => ({
        product: p,
        score: calculateSimilarity(product, p)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map(item => item.product);

    return recommendations;
  };

  const calculateSimilarity = (product1: Product, product2: Product): number => {
    let score = 0;
    
    // Same category
    if (product1.category === product2.category) score += 3;
    
    // Same brand
    if (product1.brand === product2.brand) score += 2;
    
    // Similar price range (within 50%)
    const priceDiff = Math.abs(product1.price - product2.price) / Math.max(product1.price, product2.price);
    if (priceDiff <= 0.5) score += 1;
    
    // Similar rating
    const ratingDiff = Math.abs(product1.rating - product2.rating);
    if (ratingDiff <= 0.5) score += 1;
    
    // Common tags
    const commonTags = product1.tags.filter(tag => product2.tags.includes(tag));
    score += commonTags.length;
    
    return score;
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString()
    };
    
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('shopzing_products', JSON.stringify(updatedProducts));
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, ...updates } : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('shopzing_products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('shopzing_products', JSON.stringify(updatedProducts));
  };

  return (
    <ProductContext.Provider value={{
      products,
      categories,
      loading,
      searchProducts,
      getProductById,
      getProductsByCategory,
      getFeaturedProducts,
      getRecommendations,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};