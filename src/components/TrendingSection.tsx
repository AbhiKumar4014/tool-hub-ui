import React, { useState } from 'react';
import { Star, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const trendingTools = [
  {
    id: "1",
    name: 'ChatGPT-4',
    description: 'Advanced language model with enhanced reasoning and creativity capabilities.',
    category: 'Text Generation',
    rating: 4.9,
    users: '2M+',
    image: 'https://images.unsplash.com/photo-1676320181466-7a364d4e2c53'
  },
  {
    id: "2",
    name: 'Midjourney V6',
    description: 'State-of-the-art AI image generation with unprecedented quality and control.',
    category: 'Image Generation',
    rating: 4.8,
    users: '1.5M+',
    image: 'https://images.unsplash.com/photo-1686591994509-51d16087bf05'
  },
  {
    id: "3",
    name: 'Claude 3',
    description: 'Advanced AI assistant with superior analytical and coding capabilities.',
    category: 'Text Generation',
    rating: 4.7,
    users: '800K+',
    image: 'https://images.unsplash.com/photo-1684163761883-6019891f7332'
  },
  {
    id: "4",
    name: 'Gemini Pro',
    description: 'Multimodal AI model excelling in complex reasoning and analysis.',
    category: 'Text Generation',
    rating: 4.6,
    users: '1.2M+',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995'
  },
  {
    id: "5",
    name: 'Stable Video XL',
    description: 'Advanced AI model for high-quality video generation and editing.',
    category: 'Video Generation',
    rating: 4.5,
    users: '500K+',
    image: 'https://images.unsplash.com/photo-1682687220742-aba19b51f318'
  },
  {
    id: "6",
    name: 'AudioCraft',
    description: 'Next-generation AI model for music and sound generation.',
    category: 'Audio Generation',
    rating: 4.4,
    users: '300K+',
    image: 'https://images.unsplash.com/photo-1685446661741-00a8c557fe80'
  }
];

export function TrendingSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = trendingTools.length;
  // Determine 3 visible tools, wrapping around if needed
  const visibleTools = [];
  for (let i = 0; i < 3; i++) {
    visibleTools.push(trendingTools[(currentIndex + i) % total]);
  }

  const handlePrev = () => setCurrentIndex((prev) => (prev - 3 + total) % total);
  const handleNext = () => setCurrentIndex((prev) => (prev + 3) % total);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Trending Now</h2>
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visibleTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-lg overflow-hidden group cursor-pointer shadow-md border border-gray-100"
            >
              <div className="relative aspect-video">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{tool.name}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span>{tool.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-gray-400 mr-1" />
                    <span>{tool.users}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 -translate-y-1/2 left-0 p-2 bg-white/80 hover:bg-white rounded-full shadow-md"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 -translate-y-1/2 right-0 p-2 bg-white/80 hover:bg-white rounded-full shadow-md"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </section>
  );
}
