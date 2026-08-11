import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/marketing/hero-section"
import { CategoriesSection } from "@/components/marketing/categories-section"
import { FeaturedProviders } from "@/components/marketing/featured-providers"
import { HowItWorks } from "@/components/marketing/how-it-works"
import { ReviewsSection } from "@/components/marketing/reviews-section"
import { CTASection } from "@/components/marketing/cta-section"
import { SiteFooter } from "@/components/marketing/site-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProviders />
        <HowItWorks />
        <ReviewsSection />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  )
}
