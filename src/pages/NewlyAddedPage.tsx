import React, { useState, useEffect, useCallback } from 'react';
import { Star, Users, ArrowUpRight, ChevronLeft, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import getAiResponse from '../services/ai-chat-services';
import { newToolsPrompt } from '../config/prompt';
import { ToolDetailsView } from '../components/ToolDetailsView';
import { Button } from '../components/ui/button';
import { ToolCard } from '../components/ToolCard';

export function NewlyAddedPage() {
    const [tools, setTools] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTool, setSelectedTool] = useState<any>(null);
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
        setSelectedTool(tool);
    };

    const handleBack = () => {
        setSelectedTool(null);
    };

    const handleRefresh = async () => {
        localStorage.removeItem(localStorageKey);
        await fetchNewlyAddedTools();
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

    if (selectedTool) {
        return <ToolDetailsView tool={selectedTool} onBack={handleBack} />;
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
                    Discover the latest AI tools added to our platform.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool) => (
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
