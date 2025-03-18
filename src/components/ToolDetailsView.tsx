import React from "react";
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
  ChevronLeft,
  BarChart2,
  Download,
  ThumbsUp,
  Award,
  Users  // Add Users to imports
} from "lucide-react";

interface PricingTier {
  type: "free" | "premium";
  plan: string;
  cost: string;
}

export interface AITool {
  // ...existing interface properties...
}

interface ToolDetailsViewProps {
  tool: AITool;
  onBack: () => void;
}

export function ToolDetailsView({ tool, onBack }: ToolDetailsViewProps) {
  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-gray-400">No rating yet</span>;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < Math.floor(rating)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Consistent Header with other pages */}
        <div className="flex items-center p-4 mb-6">
          <button onClick={onBack} className="flex items-center text-blue-600 hover:underline">
            <ChevronLeft className="w-5 h-5 mr-1" /> Back
          </button>
          <div className="flex-grow text-center">
            <h1 className="text-4xl font-bold text-gray-900">{tool.name}</h1>
          </div>
          <div className="w-12" />
        </div>

        {/* Enhanced Tool Header Info */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-start gap-8">
            {/* Logo Section */}
            <div className="w-40 h-40 relative flex-shrink-0">
              <img
                src={tool.logoUrl}
                alt={tool.name}
                className="w-full h-full rounded-xl object-cover shadow-lg"
              />
              {tool.featured && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2">
                  <Crown className="w-5 h-5 text-white" />
                </div>
              )}
            </div>

            {/* Tool Info Section */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {tool.name}
                </h1>
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

              {/* Description */}
              <p className="text-lg text-gray-600 mb-6">{tool.description}</p>

              {/* Stats Grid - Made consistent with 4 columns */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 flex flex-col">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <Star className="w-4 h-4" />
                    <span className="font-medium">Rating</span>
                  </div>
                  {renderStars(tool.rating || 0)}
                </div>
                <div className="bg-green-50 rounded-lg p-4 flex flex-col">
                  <div className="flex items-center gap-2 text-green-600 mb-2">
                    <Download className="w-4 h-4" />
                    <span className="font-medium">Users</span>
                  </div>
                  <span className="text-lg font-semibold">{tool.users}</span>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 flex flex-col">
                  <div className="flex items-center gap-2 text-purple-600 mb-2">
                    <Building2 className="w-4 h-4" />
                    <span className="font-medium">Company</span>
                  </div>
                  <span className="text-lg font-semibold">{tool.company || 'Unknown'}</span>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 flex flex-col">
                  <div className="flex items-center gap-2 text-orange-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">Origin</span>
                  </div>
                  <span className="text-lg font-semibold">{tool.origin || 'Unknown'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Globe className="w-5 h-5" />
                  Visit Website
                </a>
                {tool.pricing?.[0]?.type === 'free' && (
                  <button className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" />
                    Try for Free
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
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
                <h2 className="text-xl font-semibold mb-4 text-green-600">
                  Pros
                </h2>
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
                <h2 className="text-xl font-semibold mb-4 text-red-600">
                  Cons
                </h2>
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
            {/* Categories and Tags Combined */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="space-y-6">
                {/* Categories Section */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Categories</h2>
                  <div className="flex flex-wrap gap-2">
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

                {/* Tags Section */}
                {tool.tags && (
                  <div>
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
              </div>
            </div>

            {/* Pricing */}
            {tool.pricing && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Pricing</h2>
                <div className="space-y-4">
                  {tool.pricing.map((tier, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        tier.type === "premium"
                          ? "bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100"
                          : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{tier.plan}</span>
                        <span
                          className={`text-sm ${
                            tier.type === "premium"
                              ? "text-purple-600"
                              : "text-gray-600"
                          }`}
                        >
                          {tier.cost}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-8 bg-white rounded-xl shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">

            <div className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-green-500 mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-lg font-medium">
                  {new Date(tool?.created).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-600">Created</p>
            </div>

            <div className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-purple-500 mb-2">
                <RefreshCw className="w-5 h-5" />
                <span className="text-lg font-medium">
                  {new Date(tool.updated).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-600">Last Updated</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
