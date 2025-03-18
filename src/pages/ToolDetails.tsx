import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Globe, 
  Building2, 
  MapPin, 
  Tags, 
  Check, 
  X, 
  Clock, 
  RefreshCw,
  Star,
  Crown,
  ChevronLeft
} from 'lucide-react';

interface PricingTier {
  type: 'free' | 'premium';
  plan: string;
  cost: string;
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  url: string;
  logoUrl: string;
  pricing?: PricingTier[];
  company?: string;
  origin?: string;
  trending?: boolean;
  featured?: boolean;
  tags?: string[];
  features: string[];
  pros: string[];
  cons: string[];
  created: string;
  updated: string;
}

export function ToolDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [tool, setTool] = useState<AITool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (location.state && location.state.tool) {
      setTool(location.state.tool);
      setLoading(false);
    } else {
      setError("Tool data not available.");
      setLoading(false);
    }
  }, [location.state, id]);

  if (loading) {
    return (
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 hover:underline mb-4">
            <ChevronLeft className="w-5 h-5 mr-1" /> Back
          </button>
          <p>Loading tool details...</p>
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
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 hover:underline mb-4">
            <ChevronLeft className="w-5 h-5 mr-1" /> Back
          </button>
          <p>Tool not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Combined Header */}
        <div className="flex items-center border border-gray-300 shadow-lg p-4 mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 hover:underline">
            <ChevronLeft className="w-5 h-5 mr-1" /> Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 ml-4">{tool.name}</h1>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-start gap-6">
            <img
              src={tool.logoUrl}
              alt={tool.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
                {tool.trending && (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Trending
                  </span>
                )}
                {tool.featured && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Crown className="w-3 h-3" /> Featured
                  </span>
                )}
              </div>
              <p className="text-lg text-gray-600 mb-4">{tool.description}</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe className="w-4 h-4" />
                  <a href={tool.url} className="hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </a>
                </div>
                {tool.company && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building2 className="w-4 h-4" />
                    <span>{tool.company}</span>
                  </div>
                )}
                {tool.origin && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{tool.origin}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Categories */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <div className="flex gap-2">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {tool.category}
                </span>
                {tool.subcategory && (
                  <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                    {tool.subcategory}
                  </span>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Key Features</h2>
              <ul className="space-y-3">
                {tool.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-green-600">Pros</h2>
                <ul className="space-y-3">
                  {tool.pros.map((pro, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-red-600">Cons</h2>
                <ul className="space-y-3">
                  {tool.cons.map((con, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <X className="w-5 h-5 text-red-500" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Pricing */}
            {tool.pricing && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Pricing</h2>
                <div className="space-y-4">
                  {tool.pricing.map((tier, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        tier.type === 'premium' 
                          ? 'bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100' 
                          : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{tier.plan}</span>
                        <span className={`text-sm ${tier.type === 'premium' ? 'text-purple-600' : 'text-gray-600'}`}>
                          {tier.cost}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {tool.tags && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Tags className="w-5 h-5 text-gray-600" />
                  <h2 className="text-xl font-semibold">Tags</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Dates */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Created: {new Date(tool.created).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <RefreshCw className="w-4 h-4" />
                  <span>Last updated: {new Date(tool.updated).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}