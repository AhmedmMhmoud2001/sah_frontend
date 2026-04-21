import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function HeroSection() {
  const { t } = useI18n()
  return (
    <section className="hero" aria-label={t('home.heroTitle', { brand: 'Odoo' })}>
      <div className="container hero__inner">
        <div className="hero__content hero__content--center">
          <h1 className="hero__accent">
            {t('home.heroTitle', {
              brand: `<span class="hero__accent">Odoo</span>`,
            })
              .split('<span class="hero__accent">Odoo</span>')
              .map((part, idx, arr) =>
                idx === arr.length - 1 ? (
                  part
                ) : (
                  <span key={idx}>
                    {part}
                    <span className="hero__accent">Odoo</span>
                  </span>
                ),
              )}
          </h1>
          <p className="hero__subtitle">
            {t('home.heroSubtitle')}
          </p>

          <div className="hero__actions hero__actions--center">
            <a className="btn btn--primary btn--hero" href="#courses">
              {t('home.startLearning')}
            </a>

            <a className="heroVideo" href="#intro-video">
              <span className="heroVideo__icon" aria-hidden="true">
                ▶
              </span>
              <span className="heroVideo__text">{t('home.introVideo')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

