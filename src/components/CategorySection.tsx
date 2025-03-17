import React from 'react';

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
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.title}
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
    </section>
  );
}