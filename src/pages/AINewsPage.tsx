import React from 'react';
import { Link } from 'react-router-dom';

const newsList = [
  {
    id: "1",
    title: "OpenAI Releases ChatGPT-5",
    description: "New breakthroughs in conversational AI announced by OpenAI.",
    date: "2024-04-01",
    image: "https://via.placeholder.com/600x400"
  },
  {
    id: "2",
    title: "Google’s AI Achieves New Milestone",
    description: "Google's latest AI system surpasses previous benchmarks.",
    date: "2024-03-28",
    image: "https://via.placeholder.com/600x400"
  },
  {
    id: "3",
    title: "AI in Healthcare: New Advances",
    description: "Revolutionary AI tools are transforming the healthcare industry.",
    date: "2024-03-25",
    image: "https://via.placeholder.com/600x400"
  }
];

export function AINewsPage() {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI News</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news and breakthroughs in AI.
          </p>
        </div>
        <div className="space-y-8">
          {newsList.map((news) => (
            <Link
              to={`/news/${news.id}`}
              key={news.id}
              className="block bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{news.title}</h2>
                  <p className="text-gray-600 mb-4">{news.description}</p>
                  <p className="text-sm text-gray-500">Published on {new Date(news.date).toLocaleDateString()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
