import React, { useState, useEffect, useCallback } from 'react';
import { Star, Users, ArrowUpRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import getAiResponse from '../services/ai-chat-services';
import { newToolsPrompt } from '../config/prompt';

export function NewlyAddedPage() {
    const [tools, setTools] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const localStorageKey = 'newlyAddedToolsData';
    const refetchInterval = 5 * 60 * 60 * 1000; // 5 hours

    const fetchNewlyAddedTools = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const prompt = newToolsPrompt();
            const response = await getAiResponse(prompt);
            try {
                const parsedTools = eval(response);
                console.log("Newly Added Tools:", parsedTools);
                setTools(parsedTools);
                localStorage.setItem(localStorageKey, JSON.stringify(parsedTools));
            } catch (parseError: any) {
                console.error("Error parsing JSON:", parseError);
                setError(`Error parsing JSON: ${parseError.message}`);
                setTools([]);
                localStorage.removeItem(localStorageKey);
            }
        } catch (err: any) {
            console.error("Failed to fetch new tools:", err);
            setError(err.message || "Failed to fetch new tools.");
            setTools([]);
            localStorage.removeItem(localStorageKey);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const storedData = localStorage.getItem(localStorageKey);
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                setTools(parsedData);
                setLoading(false);
            } catch (parseError) {
                console.error("Error parsing stored JSON:", parseError);
                localStorage.removeItem(localStorageKey);
                fetchNewlyAddedTools();
            }
        } else {
            fetchNewlyAddedTools();
        }
        const intervalId = setInterval(fetchNewlyAddedTools, refetchInterval);
        return () => clearInterval(intervalId);
    }, [fetchNewlyAddedTools]);

    const handleToolClick = (tool: any) => {
        navigate(`/tool/${tool.id}`, { state: { tool } });
    };

    if (loading) {
        return (
            <div className="pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-blue-600 hover:underline mb-4"
                    >
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
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-blue-600 hover:underline mb-4"
                    >
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
                <div className="flex items-center p-4 mb-4">
                    <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 hover:underline">
                        <ChevronLeft className="w-5 h-5 mr-1" /> Back
                    </button>
                    <div className="flex-grow text-center">
                        <h1 className="text-4xl font-bold text-gray-900">Newly Added Tools</h1>
                    </div>
                    {/* Optionally, add an empty div to balance the back button */}
                    <div className="w-12" />
                </div>
                <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                    Discover the latest AI tools added to our platform.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool) => (
                        <div
                            key={tool.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                            onClick={() => handleToolClick(tool)}
                        >
                            <div className="relative aspect-video overflow-hidden">
                                {/* Tool image */}
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
