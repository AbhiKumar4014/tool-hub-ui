import React from 'react';
import { Star, Users, ArrowUpRight } from 'lucide-react';

const trendingTools = [
  {
    name: 'ChatGPT-4',
    description: 'Advanced language model with enhanced reasoning and creativity capabilities.',
    category: 'Text Generation',
    rating: 4.9,
    users: '2M+',
    image: 'https://images.unsplash.com/photo-1676320181466-7a364d4e2c53'
  },
  {
    name: 'Midjourney V6',
    description: 'State-of-the-art AI image generation with unprecedented quality and control.',
    category: 'Image Generation',
    rating: 4.8,
    users: '1.5M+',
    image: 'https://images.unsplash.com/photo-1686591994509-51d16087bf05'
  },
  {
    name: 'Claude 3',
    description: 'Advanced AI assistant with superior analytical and coding capabilities.',
    category: 'Text Generation',
    rating: 4.7,
    users: '800K+',
    image: 'https://images.unsplash.com/photo-1684163761883-6019891f7332'
  },
  {
    name: 'Gemini Pro',
    description: 'Multimodal AI model excelling in complex reasoning and analysis.',
    category: 'Text Generation',
    rating: 4.6,
    users: '1.2M+',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995'
  },
  {
    name: 'Stable Video XL',
    description: 'Advanced AI model for high-quality video generation and editing.',
    category: 'Video Generation',
    rating: 4.5,
    users: '500K+',
    image: 'https://images.unsplash.com/photo-1682687220742-aba19b51f318'
  },
  {
    name: 'AudioCraft',
    description: 'Next-generation AI model for music and sound generation.',
    category: 'Audio Generation',
    rating: 4.4,
    users: '300K+',
    image: 'https://images.unsplash.com/photo-1685446661741-00a8c557fe80'
  }
];

export function TrendingPage() {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Trending AI Tools</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most popular AI tools that are making waves in the industry
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingTools.map((tool) => (
            <div
              key={tool.name}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-600">
                  {tool.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{tool.name}</h3>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                </div>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{tool.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{tool.users}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}