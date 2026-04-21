import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import HeroSection from '../components/home/HeroSection.jsx'
import FeaturesSection from '../components/home/FeaturesSection.jsx'
import CoursesSection from '../components/home/CoursesSection.jsx'
import TestimonialsSection from '../components/home/TestimonialsSection.jsx'
import StepsSection from '../components/home/StepsSection.jsx'
import CTASection from '../components/home/CTASection.jsx'
import IntroVideoModal from '../components/home/IntroVideoModal.jsx'
import './home.css'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { useEffect, useState } from 'react'

export default function Home() {
  const { dir, lang } = useI18n()
  const [introOpen, setIntroOpen] = useState(false)

  useEffect(() => {
    function syncFromHash() {
      const hash = typeof window !== 'undefined' ? window.location.hash : ''
      setIntroOpen(hash === '#intro-video')
    }
    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [])

  function closeIntro() {
    setIntroOpen(false)
    if (typeof window === 'undefined') return
    if (window.location.hash === '#intro-video') {
      window.history.pushState('', document.title, window.location.pathname + window.location.search)
    }
  }

  return (
    <div className="app app--home" dir={dir} lang={lang}>
      <Navbar topBarTransparent logoHome />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CoursesSection />
        <TestimonialsSection />
        <StepsSection />
        <div id="faq" className="faqAnchor" aria-hidden="true" />
        <CTASection />
      </main>
      <IntroVideoModal
        open={introOpen}
        onClose={closeIntro}
        videoUrl="https://www.youtube.com/embed/ysz5S6PUM-U"
      />
      <Footer />
    </div>
  )
}

