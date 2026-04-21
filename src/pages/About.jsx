import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import IntroVideoModal from '../components/home/IntroVideoModal.jsx'
import './home.css'
import './about.css'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { useEffect, useState } from 'react'

import cardHeader from '../assets/img_home/Group 1000001635.png'

export default function About() {
  const { dir, lang, t } = useI18n()
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
    <div className="app" dir={dir} lang={lang}>
      <Navbar />

      <main className="aboutPage">
        <section className="aboutHero" aria-label={t('nav.about')}>
          <div className="container aboutHero__inner">
            <div className="aboutHero__content">
              <h1 className="aboutHero__title">{t('about.title')}</h1>
              <p className="aboutHero__text">{t('about.p1')}</p>
              <p className="aboutHero__text">{t('about.p2')}</p>
              <p className="aboutHero__text">{t('about.p3')}</p>

              <a className="aboutHero__video" href="#intro-video">
                <span className="aboutHero__play" aria-hidden="true">
                  ▶
                </span>
                {t('about.introVideo')}
              </a>
            </div>

            <div className="aboutHero__media" aria-hidden="true">
              <div className="aboutCollage">
                <img
                  className="aboutCollage__img"
                  src={cardHeader}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>
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

