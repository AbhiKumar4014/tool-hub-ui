import React, { useState, useEffect } from 'react';
import { Star, Users, ChevronLeft } from 'lucide-react';
import getAiResponse from '../services/ai-chat-services';

export function NewlyAddedPage() {
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewTools = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAiResponse("Prompt for newly added tools");
        const parsedTools = eval(response);
        setTools(parsedTools);
      } catch (err: any) {
        setError(err.message || "Failed to fetch new tools.");
      } finally {
        setLoading(false);
      }
    };
    fetchNewTools();
  }, []);

  if (loading) {
    return (
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <button onClick={() => window.history.back()} className="flex items-center text-blue-600 hover:underline mb-4">
            <ChevronLeft className="w-5 h-5 mr-1" /> Back
          </button>
          <p>Loading newly added tools...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <button onClick={() => window.history.back()} className="flex items-center text-blue-600 hover:underline mb-4">
            <ChevronLeft className="w-5 h-5 mr-1" /> Back
          </button>
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <button onClick={() => window.history.back()} className="flex items-center text-blue-600 hover:underline mb-4">
          <ChevronLeft className="w-5 h-5 mr-1" /> Back
        </button>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Newly Added Tools</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div key={tool.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>{tool.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-5 h-5 text-gray-400" />
                <span>{tool.users}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
