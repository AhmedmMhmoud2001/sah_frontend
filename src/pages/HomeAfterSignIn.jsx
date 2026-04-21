import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import HeroSection from '../components/home/HeroSection.jsx'
import FeaturesSection from '../components/home/FeaturesSection.jsx'
import ContinueLearningSection from '../components/home/ContinueLearningSection.jsx'
import CoursesSection from '../components/home/CoursesSection.jsx'
import TestimonialsSection from '../components/home/TestimonialsSection.jsx'
import StepsSection from '../components/home/StepsSection.jsx'
import CTASection from '../components/home/CTASection.jsx'
import './home.css'
import './home-after.css'
import { useI18n } from '../i18n/I18nProvider.jsx'

export default function HomeAfterSignIn() {
  const { dir, lang } = useI18n()
  return (
    <div className="app app--home" dir={dir} lang={lang}>
      <Navbar authenticated homePath="/app" topBarTransparent logoHome />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ContinueLearningSection />
        <CoursesSection />
        <TestimonialsSection />
        <StepsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
