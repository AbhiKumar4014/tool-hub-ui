import { CategorySection } from "../components/CategorySection";
import { FeaturedTools } from "../components/FeaturedTools";
import { Hero } from "../components/Hero";
import { NewsSection } from "../components/NewsSection";
import { TrendingSection } from "../components/TrendingSection";

export function HomePage() {
  return (
    <>
      <Hero />
      <div className="space-y-12 pb-12">
        <CategorySection />
        <TrendingSection />
        <FeaturedTools/>
        <NewsSection />
      </div>
    </>
  );
}