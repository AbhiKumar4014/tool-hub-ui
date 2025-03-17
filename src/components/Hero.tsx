import React from 'react';
import { Play, Info } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative h-[80vh] w-full">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995"
          alt="AI Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
      </div>
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-5xl font-bold text-gray-900">ChatGPT-4 Turbo</h1>
          <p className="text-lg text-gray-600">
            Experience the next generation of AI with enhanced capabilities in reasoning, creativity, and understanding.
            Now with expanded context window and real-time knowledge.
          </p>
          <div className="flex space-x-4">
            <button className="flex items-center px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              <Play className="w-5 h-5 mr-2" />
              Try Now
            </button>
            <button className="flex items-center px-6 py-2 bg-gray-100 text-gray-900 rounded hover:bg-gray-200 transition-colors">
              <Info className="w-5 h-5 mr-2" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}