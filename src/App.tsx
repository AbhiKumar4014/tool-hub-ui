import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { TrendingPage } from './pages/TrendingPage';
import { ToolDetails } from './pages/ToolDetails';
import { CategoryPage } from './pages/CategoryPage';
import { AINewsPage } from './pages/AINewsPage';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/tool/:id" element={<ToolDetails />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/ai-news" element={<AINewsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
