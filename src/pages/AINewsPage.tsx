import React, { useState, useEffect, useCallback } from 'react';
import { Star, Users, ArrowUpRight } from 'lucide-react';
import getAiResponse from '../services/ai-chat-services';
import { useNavigate } from 'react-router-dom';

export function AINewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const prompt = `Research and list the valid significant news articles and blog posts about artificial intelligence from authoritative and reputable sources. Ensure that the articles cover a diverse range of AI-related topics, including advancements in AI technology, ethical concerns, industry impact, regulatory changes, and major corporate developments.
            For each article, provide the following structured information in a strictly well-formatted and valid JSON array, with no extra commentary or markdown formatting:
            title: The headline of the article.
            id: A unique identifier for the article.
            summary: A concise summary capturing the key points of the article.
            source: The name of the reputable source or publisher.
            url: The direct link to the article.
            date: The date the article was published.
            The JSON response should be properly formatted and free of any additional commentary.`;
      const response = await getAiResponse(prompt);

      try {
        const newsArticles = eval(response);
        console.log("AI News:", newsArticles); // Log the response for inspection
        setNews(newsArticles);
      } catch (parseError: any) {
        console.error("Error parsing JSON:", parseError);
        setError(`Error parsing JSON: ${parseError.message}`);
        setNews([]);
      }
    } catch (error: any) {
      console.error("Failed to fetch news:", error);
      setError(error.message || "Failed to fetch news.");
      setNews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleNewsClick = (newsArticle: any) => {
    // navigate(`/news/${newsArticle.id}`, { state: { newsArticle } });
    console.log("News article clicked:", newsArticle);
  };

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (loading) {
    return (
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI News</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay up-to-date with the latest news and developments in the world of AI.
            </p>
          </div>
          <p>Loading news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI News</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay up-to-date with the latest news and developments in the world of AI.
            </p>
          </div>
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI News</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay up-to-date with the latest news and developments in the world of AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((newsArticle) => (
            <div
              key={newsArticle.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              onClick={() => handleNewsClick(newsArticle)}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{newsArticle.title}</h3>
                <p className="text-gray-600 mb-4">{newsArticle.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{newsArticle.source}</span>
                  <span>{newsArticle.date}</span>
                </div>
                <a href={newsArticle.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
