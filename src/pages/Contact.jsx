import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import './home.css'
import './contact.css'
import { useI18n } from '../i18n/I18nProvider.jsx'
import contactIllus from '../assets/img_contact/contact-illus.png'

export default function Contact() {
  const { dir, lang, t } = useI18n()
  return (
    <div className="app" dir={dir} lang={lang}>
      <Navbar />

      <main className="contactPage">
        <section className="contactHero" aria-label={t('nav.contact')}>
          <div className="container contactHero__inner">
            <header className="contactHero__header">
              <h1 className="contactHero__title">{t('contact.title')}</h1>
              <p className="contactHero__subtitle">
                {t('contact.subtitle')}
              </p>
            </header>

            <div className="contactHero__grid">
            <aside className="contactIllus" aria-hidden="true">
                <div className="contactIllus__wrap contactIllus__wrap--img">
                  <img
                    className="contactIllus__img"
                    src={contactIllus}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </aside>
              <form className="contactForm" aria-label={t('contact.form')}>
                <div className="contactForm__field">
                  <label className="contactForm__label" htmlFor="fullName">
                    {t('contact.fullName')}
                  </label>
                  <input
                    className="contactForm__input"
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder={t('contact.fullNamePh')}
                    autoComplete="name"
                  />
                </div>

                <div className="contactForm__field">
                  <label className="contactForm__label" htmlFor="email">
                    {t('contact.emailOrPhone')}
                  </label>
                  <input
                    className="contactForm__input"
                    id="email"
                    name="email"
                    type="text"
                    placeholder={t('contact.emailOrPhonePh')}
                    autoComplete="email"
                  />
                </div>

                <div className="contactForm__field">
                  <label className="contactForm__label" htmlFor="message">
                    {t('contact.message')}
                  </label>
                  <textarea
                    className="contactForm__textarea"
                    id="message"
                    name="message"
                    placeholder={t('contact.messagePh')}
                    rows={7}
                  />
                </div>

                <button className="contactForm__submit" type="button">
                  {t('contact.send')}
                </button>
              </form>

              {/* <aside className="contactIllus" aria-hidden="true">
                <div className="contactIllus__wrap contactIllus__wrap--img">
                  <img
                    className="contactIllus__img"
                    src={contactIllus}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </aside> */}
            </div>

            <section className="contactCards" aria-label={t('contact.info')}>
              <article className="contactCard">
                <div className="contactCard__icon" aria-hidden="true">
                  ☎
                </div>
                <p className="contactCard__label">{t('contact.phone')}</p>
                <p className="contactCard__value" dir="ltr">
                  +966 50 123 4567
                </p>
              </article>

              <article className="contactCard">
                <div className="contactCard__icon" aria-hidden="true">
                  ✉
                </div>
                <p className="contactCard__label">{t('contact.email')}</p>
                <p className="contactCard__value">info@smahacademy.com</p>
              </article>

              <article className="contactCard">
                <div className="contactCard__icon" aria-hidden="true">
                  ⌁
                </div>
                <p className="contactCard__label">{t('contact.address')}</p>
                <p className="contactCard__value">{t('contact.addressValue')}</p>
              </article>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

