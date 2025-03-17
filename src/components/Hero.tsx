import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';

// New array of slides with different details
const slides = [
  {
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    title: "ChatGPT-4 Turbo",
    description: "Experience the next generation of AI with enhanced reasoning, creativity, and understanding.",
    primaryText: "Try Now",
    secondaryText: "More Info"
  },
  {
    image: "https://images.unsplash.com/photo-1581092428401-9bf6e24b4f21",
    title: "Midjourney Magic",
    description: "Explore stunning image generation with cutting-edge control and quality.",
    primaryText: "Explore Now",
    secondaryText: "Learn More"
  },
  {
    image: "https://images.unsplash.com/photo-1564869731252-ea1e8ad8ef96",
    title: "CodeGen Pro",
    description: "Revolutionize your coding experience with automated code generation.",
    primaryText: "Code It",
    secondaryText: "See Details"
  }
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  const currentSlide = slides[currentIndex];
  
  return (
    <div className="relative h-[80vh] w-full">
      <div className="absolute inset-0">
        <img
          src={currentSlide.image}
          alt="AI Background"
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
      </div>
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-5xl font-bold text-gray-900">{currentSlide.title}</h1>
          <p className="text-lg text-gray-600">
            {currentSlide.description}
          </p>
          <div className="flex space-x-4">
            <button className="flex items-center px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              <Play className="w-5 h-5 mr-2" />
              {currentSlide.primaryText}
            </button>
            <button className="flex items-center px-6 py-2 bg-gray-100 text-gray-900 rounded hover:bg-gray-200 transition-colors">
              <Info className="w-5 h-5 mr-2" />
              {currentSlide.secondaryText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
