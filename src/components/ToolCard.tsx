import React from 'react';
import { Star, Users, ArrowUpRight, Crown, Zap } from 'lucide-react';

const DEFAULT_LOGO = "https://imgcdn.stablediffusionweb.com/2025/3/4/29083c87-f2f8-4cc3-b5c0-f99d36a25c71.jpg";

interface ToolCardProps {
  tool: any;
  onClick: (tool: any) => void;
}

export function ToolCard({ tool, onClick }: ToolCardProps) {
  const [logoError, setLogoError] = React.useState(false);

  const handleLogoError = () => {
    setLogoError(true);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer"
      onClick={() => onClick(tool)}
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={logoError ? DEFAULT_LOGO : tool.logoUrl}
          alt={tool.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={handleLogoError}
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <div className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-600">
            {tool.category}
          </div>
          {tool.trending && (
            <div className="bg-red-500/90 px-3 py-1 rounded-full text-sm font-medium text-white flex items-center gap-1">
              <Zap className="w-3 h-3" /> Trending
            </div>
          )}
          {tool.featured && (
            <div className="bg-yellow-500/90 px-3 py-1 rounded-full text-sm font-medium text-white flex items-center gap-1">
              <Crown className="w-3 h-3" /> Featured
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900">{tool.name}</h3>
          <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{tool.description}</p>
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
  );
}
