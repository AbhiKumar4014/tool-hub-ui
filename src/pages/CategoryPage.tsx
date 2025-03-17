import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Users, ArrowUpRight } from 'lucide-react';
import getAiResponse from '../services/ai-chat-services';
import { categoryToolsPrompt } from '../config/prompt';

export function CategoryPage() {
  const { category } = useParams();
  const [categoryTools, setCategoryTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const refetchInterval = 5 * 60 * 60 * 1000; // 5 hours in milliseconds

  const fetchCategoryTools = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const prompt = categoryToolsPrompt(category || '', '');
      const response = await getAiResponse(prompt);

      try {
        const tools = eval(response);
        console.log(`${category} AI Tools:`, tools);
        setCategoryTools(tools);
        localStorage.setItem(category as string, JSON.stringify(tools)); // Store in localStorage
      } catch (parseError: any) {
        console.error("Error parsing JSON:", parseError);
        setError(`Error parsing JSON: ${parseError.message}`);
        setCategoryTools([]);
      }
    } catch (error: any) {
      console.error(`Failed to fetch ${category} AI tools:`, error);
      setError(error.message || `Failed to fetch ${category} AI tools.`);
      setCategoryTools([]);
    } finally {
      setLoading(false);
    }
  }, [category, getAiResponse]);

  const handleToolClick = (tool: any) => {
    navigate(`/tool/${tool.id}`, { state: { tool } });
  };

  // useEffect(() => {
  //   fetchCategoryTools();
  // }, [fetchCategoryTools]);

  useEffect(() => {
      // Load data from localStorage on component mount
      const storedData = localStorage.getItem(category as string);
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setCategoryTools(parsedData);
        } catch (parseError) {
          console.error("Error parsing stored JSON:", parseError);
          localStorage.removeItem(category as string); // Remove invalid data from localStorage
          fetchCategoryTools(); // Fetch data if stored data is invalid
        }
        setLoading(false); // Set loading to false after loading from localStorage
      } else {
        fetchCategoryTools(); // Fetch data if not in localStorage
      }
  
      // Set up interval to refetch data every 5 hours
      const intervalId = setInterval(fetchCategoryTools, refetchInterval);
  
      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }, [fetchCategoryTools, category, refetchInterval]);

  if (loading) {
    return (
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{category} AI Tools</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the most popular {category} AI tools.
            </p>
          </div>
          <p>Loading {category} AI tools...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{category} AI Tools</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the most popular {category} AI tools.
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{category} AI Tools</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most popular {category} AI tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              onClick={() => handleToolClick(tool)}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={tool.logoUrl}
                  alt={tool.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-600">
                  {tool.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{tool.name}</h3>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                </div>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{tool.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{tool.users}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
