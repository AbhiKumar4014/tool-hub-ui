import React, { useState } from "react";
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
  Users,
  Share2,
  BookmarkIcon,
  Heart,
  MessageSquare,
  ArrowUpRight,
  Calendar,
  Zap,
  CheckCircle,
  XCircle,
  Link,
  Sparkles
} from "lucide-react";
// import { AITool } from "@/types/AITool";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { toast } from "react-toastify";

interface ToolDetailsViewProps {
  tool: AITool;
  onBack: () => void;
}

export function ToolDetailsView({ tool, onBack }: ToolDetailsViewProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast.success(bookmarked ? "Removed from bookmarks" : "Added to bookmarks");
  };
  
  const handleLike = () => {
    setLiked(!liked);
    toast.success(liked ? "Removed like" : "You liked this tool");
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

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
    <div className="py-8 pt-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with Back Button */}
        <div className="flex items-center mb-6">
          <button 
            onClick={onBack} 
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> 
            <span className="font-medium">Back to Tools</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Logo */}
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl shadow-lg p-2 flex-shrink-0 relative">
                <img
                  src={tool.logoUrl}
                  alt={tool.name}
                  className="w-full h-full object-contain rounded-lg"
                />
                {tool.featured && (
                  <div className="absolute -top-3 -right-3 bg-yellow-400 rounded-full p-2 shadow-md">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
              
              {/* Basic Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold">{tool.name}</h1>
                  <div className="flex gap-2">
                    {tool.trending && (
                      <span className="bg-red-500 bg-opacity-20 text-white text-xs font-medium px-2.5 py-1 rounded-full border border-white border-opacity-20 flex items-center">
                        <Zap className="w-3 h-3 mr-1" /> Trending
                      </span>
                    )}
                    {tool.featured && (
                      <span className="bg-yellow-500 bg-opacity-20 text-white text-xs font-medium px-2.5 py-1 rounded-full border border-white border-opacity-20 flex items-center">
                        <Crown className="w-3 h-3 mr-1" /> Featured
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-lg text-white text-opacity-90 mb-4 max-w-3xl">
                  {tool.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-white bg-opacity-20 text-white text-sm font-medium px-3 py-1 rounded-full flex items-center">
                    <Building2 className="w-4 h-4 mr-1.5" /> {tool.company || 'Independent'}
                  </span>
                  {tool.category && (
                    <span className="bg-white bg-opacity-20 text-white text-sm font-medium px-3 py-1 rounded-full">
                      {tool.category}
                    </span>
                  )}
                  {tool.rating && (
                    <span className="bg-white bg-opacity-20 text-white text-sm font-medium px-3 py-1 rounded-full flex items-center">
                      <Star className="w-4 h-4 mr-1.5 fill-yellow-400 text-yellow-400" /> 
                      {tool.rating.toFixed(1)} {tool.reviews && `(${tool.reviews})`}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="p-4 bg-white border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1.5" />
                <span className="text-sm">Added: {new Date(tool.created).toLocaleDateString()}</span>
              </div>
              <div className="hidden md:flex items-center ml-4">
                <RefreshCw className="w-4 h-4 mr-1.5" />
                <span className="text-sm">Updated: {new Date(tool.updated).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleBookmark}
                className={bookmarked ? "text-blue-600 border-blue-600" : ""}
              >
                <BookmarkIcon className={`w-4 h-4 mr-1.5 ${bookmarked ? "fill-blue-600" : ""}`} />
                {bookmarked ? "Saved" : "Save"}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLike}
                className={liked ? "text-red-600 border-red-600" : ""}
              >
                <Heart className={`w-4 h-4 mr-1.5 ${liked ? "fill-red-600" : ""}`} />
                {liked ? "Liked" : "Like"}
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-1.5" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left and Middle Columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs for different sections */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="reviews">Reviews & Feedback</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="p-4 flex flex-col items-center text-center bg-blue-50 border-blue-100">
                    <Star className="w-8 h-8 text-blue-600 mb-2" />
                    <span className="text-sm text-gray-600 mb-1">Rating</span>
                    <span className="text-xl font-bold text-gray-900">{tool.rating ? tool.rating.toFixed(1) : 'N/A'}</span>
                  </Card>
                  
                  <Card className="p-4 flex flex-col items-center text-center bg-green-50 border-green-100">
                    <Users className="w-8 h-8 text-green-600 mb-2" />
                    <span className="text-sm text-gray-600 mb-1">Active Users</span>
                    <span className="text-xl font-bold text-gray-900">{tool.users || 'N/A'}</span>
                  </Card>
                  
                  <Card className="p-4 flex flex-col items-center text-center bg-purple-50 border-purple-100">
                    <Building2 className="w-8 h-8 text-purple-600 mb-2" />
                    <span className="text-sm text-gray-600 mb-1">Company</span>
                    <span className="text-xl font-bold text-gray-900">{tool.company || 'Independent'}</span>
                  </Card>
                  
                  <Card className="p-4 flex flex-col items-center text-center bg-orange-50 border-orange-100">
                    <MapPin className="w-8 h-8 text-orange-600 mb-2" />
                    <span className="text-sm text-gray-600 mb-1">Based in</span>
                    <span className="text-xl font-bold text-gray-900">{tool.origin || 'Global'}</span>
                  </Card>
                </div>
                
                {/* Pros & Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 border-green-100">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h2 className="text-xl font-semibold text-green-700">Pros</h2>
                    </div>
                    <ul className="space-y-4">
                      {tool.pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                  
                  <Card className="p-6 border-red-100">
                    <div className="flex items-center gap-2 mb-4">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <h2 className="text-xl font-semibold text-red-700">Cons</h2>
                    </div>
                    <ul className="space-y-4">
                      {tool.cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <X className="w-5 h-5 text-red-500 mt-0.5" />
                          <span className="text-gray-700">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
                
                {/* Use Cases Section */}
                {tool.useCases && tool.useCases.length > 0 && (
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      Popular Use Cases
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tool.useCases.map((useCase, index) => (
                        <div key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                          <div className="bg-purple-100 p-2 rounded-full">
                            <span className="font-bold text-purple-700">{index + 1}</span>
                          </div>
                          <span className="text-gray-700">{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
                
                {/* Integrations Section */}
                {tool.integrations && tool.integrations.length > 0 && (
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      <Link className="w-5 h-5 text-blue-600" />
                      Integrations
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {tool.integrations.map((integration, index) => (
                        <Badge key={index} variant="outline" className="px-3 py-1 bg-blue-50">
                          {integration}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                )}
              </TabsContent>
              
              {/* Features Tab */}
              <TabsContent value="features" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    Key Features
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tool.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-gray-700">{feature}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
              
              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      User Reviews
                    </h2>
                    <Button size="sm">Write a Review</Button>
                  </div>
                  
                  {tool.testimonials && tool.testimonials.length > 0 ? (
                    <div className="space-y-6">
                      {tool.testimonials.map((testimonial, index) => (
                        <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar>
                              {testimonial.avatar ? (
                                <img src={testimonial.avatar} alt={testimonial.author} />
                              ) : (
                                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                                  <span className="text-blue-700 font-bold">
                                    {testimonial.author.charAt(0)}
                                  </span>
                                </div>
                              )}
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{testimonial.author}</h4>
                              {testimonial.company && (
                                <p className="text-sm text-gray-500">{testimonial.company}</p>
                              )}
                            </div>
                            <div className="ml-auto flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${
                                    i < testimonial.rating 
                                      ? 'text-yellow-400 fill-yellow-400' 
                                      : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">{testimonial.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                    </div>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-8">
            {/* Call to Action */}
            <Card className="p-6 border-2 border-blue-100">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-center">Try {tool.name}</h2>
                <div className="flex gap-4 flex-col">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 py-6"
                    onClick={() => window.open(tool.url, '_blank')}
                  >
                    <Globe className="w-5 h-5" />
                    Visit Website
                  </Button>
                  {tool.pricing && tool.pricing.some(tier => tier.type === 'free') && (
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 py-6"
                      onClick={() => window.open(tool.url, '_blank')}
                    >
                      <Download className="w-5 h-5" />
                      Try For Free
                    </Button>
                  )}
                </div>
              </div>
            </Card>
            
            {/* Pricing */}
            {tool.pricing && (
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                  <h2 className="text-xl font-semibold flex items-center justify-center gap-2">
                    <BarChart2 className="w-5 h-5" />
                    Pricing Plans
                  </h2>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {tool.pricing.map((tier, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg relative ${
                          tier.recommended 
                            ? "bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200" 
                            : tier.type === "premium"
                              ? "bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100"
                              : tier.type === "enterprise" 
                                ? "bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-100"
                                : "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100"
                        }`}
                      >
                        {tier.recommended && (
                          <span className="absolute -top-3 right-4 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                            Recommended
                          </span>
                        )}
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-lg">{tier.plan}</span>
                          <span
                            className={`font-bold text-lg ${
                              tier.type === "premium"
                                ? "text-purple-600"
                                : tier.type === "enterprise"
                                  ? "text-slate-700"
                                  : tier.type === "free"
                                    ? "text-green-600"
                                    : "text-gray-700"
                            }`}
                          >
                            {tier.cost}
                          </span>
                        </div>
                        
                        {tier.features && (
                          <ul className="mt-4 space-y-2">
                            {tier.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-green-500 mt-0.5" />
                                <span className="text-sm text-gray-600">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}
            
            {/* Categories and Tags */}
            <Card className="p-6">
              <div className="space-y-6">
                {/* Categories Section */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Categories</h2>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {tool.category}
                    </Badge>
                    {tool.subcategory && (
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                        {tool.subcategory}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <Separator />

                {/* Tags Section */}
                {tool.tags && tool.tags.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Tags className="w-4 h-4 text-gray-600" />
                      <h2 className="text-lg font-semibold">Tags</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tool.tags.map((tag, index) => (
                        <Badge 
                          key={index}
                          variant="outline" 
                          className="bg-gray-50 text-gray-700 hover:bg-gray-100"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
            
            {/* Alternatives */}
            {tool.alternatives && tool.alternatives.length > 0 && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Alternatives</h2>
                <div className="space-y-3">
                  {tool.alternatives.map((alt, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <img 
                        src={alt.logoUrl} 
                        alt={alt.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="font-medium">{alt.name}</span>
                      <ArrowUpRight className="w-4 h-4 ml-auto text-gray-400" />
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
