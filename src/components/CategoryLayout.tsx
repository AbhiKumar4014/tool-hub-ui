import React from 'react';

interface Tool {
  name: string;
  description: string;
  image: string;
  rating: number;
  users: string;
}

interface CategoryLayoutProps {
  title: string;
  description: string;
  tools: Tool[];
}

export function CategoryLayout({ title, description, tools }: CategoryLayoutProps) {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-video relative">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">⭐ {tool.rating}</span>
                  <span className="text-sm text-gray-500">{tool.users} users</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}