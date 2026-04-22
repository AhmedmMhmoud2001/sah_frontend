import { useEffect, useMemo, useRef, useState } from 'react'
import { useI18n } from '../../i18n/I18nProvider.jsx'

import navLogoHome from '../../assets/img_home/Frame 4.png'
import navLogoDefault from '../../assets/img_home/Frame 5.png'

function IconLink({ href, label, children }) {
  return (
    <a className="nav__iconLink" href={href} aria-label={label}>
      {children}
    </a>
  )
}

function GlobeIcon() {
  return (
    <svg
      className="nav__miniIcon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M2 12h20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 2c3.2 3.2 3.2 16.8 0 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 2c-3.2 3.2-3.2 16.8 0 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg
      className="nav__miniIcon nav__miniIcon--phone"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M10 18h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg
      className="nav__chevron"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SocialLinkedIn() {
  return (
    <svg className="nav__socialSvg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zm7.5 0h3.8v2h.1c.5-1 1.8-2.1 3.7-2.1 4 0 4.7 2.6 4.7 6v8.6h-4v-7.6c0-1.8 0-4.1-2.5-4.1s-2.9 2-2.9 4v7.7h-4V8.5z" />
    </svg>
  )
}

function SocialX() {
  return (
    <svg className="nav__socialSvg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2H21.5l-7.5 8.6L22.5 22h-5.6l-5.1-6.4L5.8 22H2.5l8-9.1L2 2h5.7l4.7 5.9L18.244 2zm-1.9 18h2.5L7.1 4.5H4.4l11.9 15.5z" />
    </svg>
  )
}

function SocialInstagram() {
  return (
    <svg className="nav__socialSvg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9ZM20 6.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    </svg>
  )
}

function SocialFacebook() {
  return (
    <svg className="nav__socialSvg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.49 17.52 2 12 2S2 6.49 2 12.06C2 17.06 5.66 21.2 10.44 22v-7H7.9v-2.87h2.54V9.41c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.87h-2.34V22C18.34 21.2 22 17.06 22 12.06Z" />
    </svg>
  )
}

export default function Navbar({
  authenticated = false,
  homePath = '/',
  topBarTransparent = false,
  /** When true (marketing home `/`), use Frame 4.png; otherwise Frame 5.png */
  logoHome = false,
}) {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langWrapRef = useRef(null)

  useEffect(() => {
    if (!langOpen) return
    function onDown(e) {
      if (e.key === 'Escape') setLangOpen(false)
    }
    function onDocClick(e) {
      const el = langWrapRef.current
      if (!el) return
      if (!el.contains(e.target)) setLangOpen(false)
    }
    window.addEventListener('keydown', onDown)
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('touchstart', onDocClick, { passive: true })
    return () => {
      window.removeEventListener('keydown', onDown)
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('touchstart', onDocClick)
    }
  }, [langOpen])

  const navLinks = useMemo(
    () => [
      { label: t('nav.home'), href: homePath },
      { label: t('nav.courses'), href: '/courses' },
      { label: t('nav.about'), href: '/about' },
      { label: t('nav.contact'), href: '/contact' },
    ],
    [homePath, t],
  )

  const headerLogo = logoHome ? navLogoHome : navLogoDefault

  const social = useMemo(
    () => [
      { label: 'LinkedIn', href: '#', Icon: SocialLinkedIn },
      { label: 'X', href: '#', Icon: SocialX },
      { label: 'Instagram', href: '#', Icon: SocialInstagram },
      { label: 'Facebook', href: '#', Icon: SocialFacebook },
    ],
    [],
  )

  return (
    <header className={logoHome ? 'nav nav--home' : 'nav nav--inner'} id="home">
      <div
        className={
          topBarTransparent
            ? 'nav__top nav__top--transparent'
            : 'nav__top nav__top--solid'
        }
      >
        <div className="container nav__topInner">
          <a className="nav__phone" href="tel:+221234567890" aria-label={t('nav.phone')}>
            <PhoneIcon />
            <span dir="ltr">(+22) 123 456 7890</span>
          </a>

          <div className="nav__topExtras">
            <div className="nav__social" aria-label={t('nav.social')}>
              {social.map(({ Icon, ...s }) => (
                <IconLink key={s.label} href={s.href} label={s.label}>
                  <Icon />
                </IconLink>
              ))}
            </div>

            <div className="nav__lang" ref={langWrapRef}>
              <button
                type="button"
                className="navLangBtn"
                aria-label={t('nav.chooseLanguage')}
                aria-haspopup="menu"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((v) => !v)}
              >
                <GlobeIcon />
                <span className="nav__langText">{t('nav.language')}</span>
                <ChevronDownIcon />
              </button>

              {langOpen ? (
                <div className="navLangMenu" role="menu" aria-label={t('nav.chooseLanguage')}>
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={lang === 'ar'}
                    className={lang === 'ar' ? 'navLangMenu__item is-active' : 'navLangMenu__item'}
                    onClick={() => {
                      setLang('ar')
                      setLangOpen(false)
                    }}
                  >
                    العربية
                  </button>
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={lang === 'en'}
                    className={lang === 'en' ? 'navLangMenu__item is-active' : 'navLangMenu__item'}
                    onClick={() => {
                      setLang('en')
                      setLangOpen(false)
                    }}
                  >
                    English
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="container nav__main">
        <button
          type="button"
          className="nav__burger"
          aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
          aria-expanded={open}
          onClick={() => {
            setMenuOpen(false)
            setOpen((v) => !v)
          }}
        >
          <span className="nav__burgerLines" aria-hidden="true" />
        </button>

        <div className="nav__mainRight">
          <a className="nav__brand" href={homePath} aria-label="SAH">
            <img
              className="nav__logo"
              src={headerLogo}
              alt="SAH"
              width="112"
              height="34"
              loading="eager"
              decoding="async"
            />
          </a>
        </div>

        <nav className="nav__links" aria-label={t('nav.home')}>
          {navLinks.map((l) => (
            <a key={l.label} className="nav__link" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          {authenticated ? (
            <>
              <button type="button" className="nav__bell" aria-label={t('nav.notifications')}>
                <span className="nav__bellGlyph" aria-hidden="true">
                  🔔
                </span>
                <span className="nav__bellBadge" aria-hidden="true" />
              </button>
              <div className="nav__menuWrap">
                <button
                  type="button"
                  className="nav__avatar"
                  aria-label={t('nav.accountMenu')}
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  RE
                </button>

                {menuOpen ? (
                  <>
                    <button
                      type="button"
                      className="nav__menuBackdrop"
                      aria-label={t('nav.closeMenu')}
                      onClick={() => setMenuOpen(false)}
                    />
                    <div className="navMenu" role="menu" aria-label={t('nav.accountMenu')}>
                      <div className="navMenu__header">
                        <div className="navMenu__user">
                          <p className="navMenu__name">Rana Essawi</p>
                          <p className="navMenu__email">Ranaessawi@gmail.com</p>
                        </div>
                        <div className="navMenu__avatar" aria-hidden="true">
                          RE
                        </div>
                      </div>

                      <div className="navMenu__items">
                        <a className="navMenu__item" role="menuitem" href="/my-courses">
                          <span className="navMenu__label">{t('nav.myCourses')}</span>
                          <span className="navMenu__icon" aria-hidden="true">
                            📖
                          </span>
                        </a>
                        <a
                          className="navMenu__item"
                          role="menuitem"
                          href="/settings"
                        >
                          <span className="navMenu__label">{t('nav.settings')}</span>
                          <span className="navMenu__icon" aria-hidden="true">
                            ⚙
                          </span>
                        </a>
                      </div>

                      <a
                        className="navMenu__logout"
                        role="menuitem"
                        href="/"
                        onClick={() => setMenuOpen(false)}
                      >
                        {t('nav.logout')}
                        <span className="navMenu__logoutIcon" aria-hidden="true">
                          ↩
                        </span>
                      </a>
                    </div>
                  </>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <a className="btn btn--ghost nav__login" href="/login">
                {t('nav.login')}
              </a>
              <a className="btn btn--primary" href="/signup">
                {t('nav.signup')}
              </a>
            </>
          )}
        </div>
      </div>

      {open ? (
        <div className="nav__mobile" role="dialog" aria-label={t('nav.mobileMenu')}>
          <div className="container nav__mobileInner">
            <nav className="nav__mobileLinks" aria-label={t('nav.navigation')}>
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  className="nav__mobileLink"
                  href={l.href}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="nav__mobileActions">
              {authenticated ? (
                <div className="nav__mobileAuth">
                  <button
                    type="button"
                    className="nav__bell nav__bell--full"
                    aria-label={t('nav.notifications')}
                  >
                    <span className="nav__bellGlyph" aria-hidden="true">
                      🔔
                    </span>
                    <span className="nav__bellBadge" aria-hidden="true" />
                  </button>
                  <a className="nav__avatar nav__avatar--full" href="/app">
                    RE
                  </a>
                </div>
              ) : (
                <>
                  <a className="btn btn--ghost btn--full" href="/login">
                    {t('nav.login')}
                  </a>
                  <a className="btn btn--primary btn--full" href="/signup">
                    {t('nav.signup')}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

