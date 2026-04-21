import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function CTASection() {
  const { t } = useI18n()
  return (
    <div className="ctaSection__containerdiv">
    <section className="ctaSection" aria-label={t('home.ctaTitle')}>
      <div className="container ctaSection__container">
        <div className="ctaPanel">
          <div className="ctaPanel__decor" aria-hidden="true">
            <span className="ctaPanel__decorWaves" />
            <span className="ctaPanel__decorDots" />
          </div>
          <div className="ctaPanel__inner">
            <h2 className="ctaPanel__title">{t('home.ctaTitle')}</h2>
            <p className="ctaPanel__subtitle">
              {t('home.ctaSub')}
            </p>
            <a className="ctaPanel__btn" href="#courses">
              {t('home.ctaBtn')}
            </a>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
