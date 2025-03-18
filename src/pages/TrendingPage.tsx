import React, { useState, useEffect, useCallback } from 'react';
import { Star, Users, ArrowUpRight, ChevronLeft, RefreshCw } from 'lucide-react';
import getAiResponse from '../services/ai-chat-services';
import { trendingToolsPrompt } from '../config/prompt';
import { useNavigate } from 'react-router-dom';
import { ToolDetailsView } from '../components/ToolDetailsView';
import { Button } from '../components/ui/button';
import { ToolCard } from '../components/ToolCard';

export function TrendingPage() {
  const [trendingTools, setTrendingTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const navigate = useNavigate();

  const localStorageKey = 'trendingToolsData';
  const refetchInterval = 5 * 60 * 60 * 1000; // 5 hours in milliseconds

  const fetchTrendingTools = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const prompt = trendingToolsPrompt('');
      const response = await getAiResponse(prompt);

      try {
        console.log("Response:", response);
        const tools = eval(response);
        console.log("AI Tools:", tools); // Log the response for inspection
        setTrendingTools(tools);
        localStorage.setItem(localStorageKey, JSON.stringify(tools)); // Store in localStorage
      } catch (parseError: any) {
        console.error("Error parsing JSON:", parseError);
        setError(`Error parsing JSON: ${parseError.message}`);
        setTrendingTools([]); // Clear the tools array on error
        localStorage.removeItem(localStorageKey); // Remove invalid data from localStorage
      }
    } catch (error: any) {
      console.error("Failed to fetch trending tools:", error);
      setError(error.message || "Failed to fetch trending tools.");
      setTrendingTools([]); // Clear the tools array on error
      localStorage.removeItem(localStorageKey); // Remove invalid data from localStorage
    } finally {
      setLoading(false);
    }
  }, [trendingToolsPrompt, getAiResponse]);

  const handleToolClick = (tool: any) => {
    setSelectedTool(tool);
  };

  const handleBack = () => {
    setSelectedTool(null);
  };

  const handleRefresh = async () => {
    localStorage.removeItem(localStorageKey);
    await fetchTrendingTools();
  };

  useEffect(() => {
    // Load data from localStorage on component mount
    const storedData = localStorage.getItem(localStorageKey);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setTrendingTools(parsedData);
      } catch (parseError) {
        console.error("Error parsing stored JSON:", parseError);
        localStorage.removeItem(localStorageKey); // Remove invalid data from localStorage
        fetchTrendingTools(); // Fetch data if stored data is invalid
      }
      setLoading(false); // Set loading to false after loading from localStorage
    } else {
      fetchTrendingTools(); // Fetch data if not in localStorage
    }

    // Set up interval to refetch data every 5 hours
    const intervalId = setInterval(fetchTrendingTools, refetchInterval);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchTrendingTools]);

  if (selectedTool) {
    return <ToolDetailsView tool={selectedTool} onBack={handleBack} />;
  }

  if (loading) {
    return (
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 hover:underline mb-4">
            <ChevronLeft className="w-5 h-5 mr-1" /> Back
          </button>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Trending AI Tools</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the most popular AI tools that are making waves in the industry
            </p>
          </div>
          <p>Loading trending tools...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 hover:underline mb-4">
            <ChevronLeft className="w-5 h-5 mr-1" /> Back
          </button>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Trending AI Tools</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the most popular AI tools that are making waves in the industry
            </p>
          </div>
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!loading && !error) {
    return (
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Updated Header without border and drop shadow */}
          <div className="flex items-center p-4 mb-4">
            <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 hover:underline">
              <ChevronLeft className="w-5 h-5 mr-1" /> Back
            </button>
            <div className="flex-grow text-center">
              <h1 className="text-4xl font-bold text-gray-900">Trending AI Tools</h1>
            </div>
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Discover the most popular AI tools that are making waves in the industry.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {trendingTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onClick={handleToolClick}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}