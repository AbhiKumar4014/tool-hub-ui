import React from 'react';
import { ArrowRight } from 'lucide-react';

const news = [
  {
    title: 'GPT-4 Turbo Released with Enhanced Capabilities',
    excerpt: 'OpenAI launches the next generation of its language model with improved performance and new features.',
    date: 'March 15, 2024',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995'
  },
  {
    title: 'Revolutionary AI Art Generation Breakthrough',
    excerpt: 'New algorithm enables unprecedented control over AI-generated artwork, setting new industry standards.',
    date: 'March 14, 2024',
    image: 'https://images.unsplash.com/photo-1686191128892-3c8f0bd35922'
  },
  {
    title: 'AI Coding Assistant Achieves Human-Level Performance',
    excerpt: 'Latest benchmarks show AI coding tools matching senior developers in problem-solving capabilities.',
    date: 'March 13, 2024',
    image: 'https://images.unsplash.com/photo-1687186735445-df877226fae9'
  }
];

export function NewsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Latest AI News</h2>
        <button className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
          View All <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {news.map((item) => (
          <article
            key={item.title}
            className="bg-white rounded-lg overflow-hidden cursor-pointer group shadow-md border border-gray-100"
          >
            <div className="relative aspect-video">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <span className="text-sm text-gray-500">{item.date}</span>
              <h3 className="text-lg font-semibold mt-2 mb-2 text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}