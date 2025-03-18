import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import getAiResponse from '../services/ai-chat-services';
import { trendingToolsPrompt } from '../config/prompt';
import { ToolDetailsView } from './ToolDetailsView';

interface CacheData {
  data: any[];
  timestamp: number;
}

export function TrendingSection() {
  const [trendingTools, setTrendingTools] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const total = trendingTools.length;
  const navigate = useNavigate();

  const localStorageKey = 'trendingSectionData';
  const cacheExpiryTime = 5 * 60 * 60 * 1000; // 5 hours in milliseconds

  const isCacheValid = (cacheData: CacheData): boolean => {
    const now = new Date().getTime();
    return now - cacheData.timestamp < cacheExpiryTime;
  };

  useEffect(() => {
    const fetchTrendingTools = async () => {
      // Check cache first
      const storedData = localStorage.getItem(localStorageKey);
      if (storedData) {
        try {
          const parsedCache: CacheData = JSON.parse(storedData);
          if (isCacheValid(parsedCache)) {
            setTrendingTools(parsedCache.data);
            setLoading(false);
            return;
          }
        } catch (parseError) {
          console.error("Error parsing stored JSON:", parseError);
          localStorage.removeItem(localStorageKey);
        }
      }

      // Fetch new data if cache is invalid or missing
      setLoading(true);
      setError(null);
      try {
        const prompt = trendingToolsPrompt('');
        const response = await getAiResponse(prompt);
        console.log(prompt, response);

        const tools = eval(response);

        // Check if the parsed result is an array
        if (!Array.isArray(tools)) {
            throw new Error("Invalid AI response: Parsed result is not an array");
        }

        // Store in cache with timestamp
        const cacheData: CacheData = {
          data: tools,
          timestamp: new Date().getTime()
        };
        localStorage.setItem(localStorageKey, JSON.stringify(cacheData));
        setTrendingTools(tools);
      } catch (error: any) {
        console.error("Failed to fetch trending tools:", error);
        setError(error.message || "Failed to fetch trending tools."); // Set the error message
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingTools();
  }, []);

  // Determine 3 visible tools, wrapping around if needed
  const visibleTools = [];
  for (let i = 0; i < 3; i++) {
    visibleTools.push(trendingTools[(currentIndex + i) % total]);
  }

  const handlePrev = () => setCurrentIndex((prev) => (prev - 3 + total) % total);
  const handleNext = () => setCurrentIndex((prev) => (prev + 3) % total);

  const handleToolClick = (tool: any) => {
    setSelectedTool(tool);
  };

  const handleBack = () => {
    setSelectedTool(null);
  };

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Trending Now</h2>
        <p>Loading trending tools...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Trending Now</h2>
        <p className="text-red-500">Error: {error}</p>
      </section>
    );
  }

  if (selectedTool) {
    return <ToolDetailsView tool={selectedTool} onBack={handleBack} />;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Trending Now</h2>
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visibleTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-lg overflow-hidden group cursor-pointer shadow-md border border-gray-100"
              onClick={() => handleToolClick(tool)}
            >
              <div className="relative aspect-video">
                <img
                  src={tool.logoUrl}
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
