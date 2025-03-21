import React, { useState, useEffect } from 'react';
import { Menu, Search, Bell, User, ChevronDown, Newspaper, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const categories = [
  'Code Generation',
  'Image Generation',
  'Video Generation',
  'Text Generation',
  'Audio Generation',
  'Model Training',
  '3D Generation',
  'Chat Bots'
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    // Added border and shadow for the header menu (navbar) regardless of scroll
    <header className="fixed top-0 w-full z-50 border border-gray-300 shadow-lg bg-white transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className={`flex items-center ${isActive('/') ? 'text-blue-600' : ''}`}>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Hub
              </span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <div
                className="relative"
                onClick={() => setActiveDropdown(activeDropdown === 'categories' ? null : 'categories')}
              >
                <button className={`flex items-center text-sm font-medium transition-colors
                  ${location.pathname.includes('/category') 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'}`}>
                  Categories
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {activeDropdown === 'categories' && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link 
                to="/trending"
                className={`flex items-center text-sm font-medium transition-colors
                  ${isActive('/trending') 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Zap className="w-4 h-4 mr-1" />
                Trending
              </Link>
              <Link 
                to="/ai-news"
                className={`flex items-center text-sm font-medium transition-colors
                  ${isActive('/ai-news') 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Newspaper className="w-4 h-4 mr-1" />
                AI News
              </Link>
              <Link 
                to="/newly-added"
                className={`flex items-center text-sm font-medium transition-colors
                  ${isActive('/newly-added') 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'}`}
              >
                New Tools
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-6">
            <Search className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
            <Menu className="md:hidden w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
}
