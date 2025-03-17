import React from 'react';
import { Star, Users } from 'lucide-react';

const trendingTools = [
  {
    name: 'ChatGPT-4',
    rating: 4.9,
    users: '2M+',
    image: 'https://images.unsplash.com/photo-1676320181466-7a364d4e2c53'
  },
  {
    name: 'Midjourney V6',
    rating: 4.8,
    users: '1.5M+',
    image: 'https://images.unsplash.com/photo-1686591994509-51d16087bf05'
  },
  {
    name: 'Claude 3',
    rating: 4.7,
    users: '800K+',
    image: 'https://images.unsplash.com/photo-1684163761883-6019891f7332'
  },
  {
    name: 'Gemini Pro',
    rating: 4.6,
    users: '1.2M+',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995'
  }
];

export function TrendingSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Trending Now</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingTools.map((tool) => (
          <div
            key={tool.name}
            className="bg-white rounded-lg overflow-hidden group cursor-pointer shadow-md border border-gray-100"
          >
            <div className="relative aspect-video">
              <img
                src={tool.image}
                alt={tool.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{tool.name}</h3>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  {tool.rating}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {tool.users}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}