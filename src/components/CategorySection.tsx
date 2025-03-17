import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  {
    title: 'Text Generation',
    image: 'https://images.unsplash.com/photo-1655635643532-fa9ba2648cbe',
    color: 'from-blue-600'
  },
  {
    title: 'Image Generation',
    image: 'https://images.unsplash.com/photo-1686191128892-3c8f0bd35922',
    color: 'from-purple-600'
  },
  {
    title: 'Code Assistant',
    image: 'https://images.unsplash.com/photo-1687186735445-df877226fae9',
    color: 'from-green-600'
  },
  {
    title: 'Audio Tools',
    image: 'https://images.unsplash.com/photo-1684163761883-6019891f7332',
    color: 'from-red-600'
  }
];

export function CategorySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = categories.length;
  const visibleCategories = [];
  for (let i = 0; i < 3; i++) {
    visibleCategories.push(categories[(currentIndex + i) % total]);
  }

  const handlePrev = () => setCurrentIndex((prev) => (prev - 3 + total) % total);
  const handleNext = () => setCurrentIndex((prev) => (prev + 3) % total);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Categories</h2>
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visibleCategories.map((category, idx) => (
            <div
              key={idx}
              className="relative h-48 rounded-lg overflow-hidden cursor-pointer group shadow-md"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${category.color} to-transparent opacity-60`} />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
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
