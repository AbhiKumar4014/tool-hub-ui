import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { TrendingSection } from './components/TrendingSection';
import { NewsSection } from './components/NewsSection';
import { TrendingPage } from './pages/TrendingPage';
import { ToolDetails } from './pages/ToolDetails';
import { CategoryPage } from './pages/CategoryPage';
import { AINewsPage } from './pages/AINewsPage';

function Home() {
  return (
    <>
      <Hero />
      <div className="space-y-12 pb-12">
        <CategorySection />
        <TrendingSection />
        <NewsSection />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/trending/:period" element={<TrendingPage />} />
          <Route path="/category/:category" element={<CategoryPage />} /> {/* New route for category pages */}
          <Route path="/news" element={<AINewsPage />} /> {/* New route for AI News Page */}
          <Route path="/tool/:id" element={<ToolDetails />} /> 
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
