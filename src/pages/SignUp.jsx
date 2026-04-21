import './auth.css'
import AuthBrandSide from '../components/auth/AuthBrandSide.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'

export default function SignUp() {
  const { dir, lang, t } = useI18n()
  return (
    <div className="authPage" dir={dir} lang={lang}>
      <div className="authSplit">
       

        <AuthBrandSide />
        <div className="authFormPanel">
          <h1 className="authTitle">{t('auth.signupTitle')}</h1>
          <p className="authSubtitle">
            {t('auth.signupSub')}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              window.location.assign('/app')
            }}
            aria-label={t('nav.signup')}
          >
            <div className="authField">
              <label className="authLabel" htmlFor="signup-name">
                {t('auth.fullName')}
              </label>
              <input
                className="authInput"
                id="signup-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder={t('auth.namePh')}
              />
            </div>

            <div className="authField">
              <label className="authLabel" htmlFor="signup-email">
                {t('auth.emailOrPhone')}
              </label>
              <input
                className="authInput"
                id="signup-email"
                name="email"
                type="text"
                autoComplete="email"
                dir="ltr"
                placeholder={t('auth.emailOrPhonePh')}
              />
            </div>

            <div className="authField">
              <label className="authLabel" htmlFor="signup-password">
                {t('auth.password')}
              </label>
              <input
                className="authInput"
                id="signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder={t('auth.passwordPh')}
              />
            </div>

            <div className="authField">
              <label className="authLabel" htmlFor="signup-password2">
                {t('auth.confirmPassword')}
              </label>
              <input
                className="authInput"
                id="signup-password2"
                name="passwordConfirm"
                type="password"
                autoComplete="new-password"
                placeholder={t('auth.confirmPasswordPh')}
              />
            </div>

            <div className="authRow" style={{ marginBottom: 18 }}>
              <label className="authCheck">
                <input type="checkbox" name="terms" required />
                {t('auth.agreeTerms')}
              </label>
            </div>

            <button className="authSubmit" type="submit">
              {t('nav.signup')}
            </button>
          </form>

          <p className="authFooterNote">
            {t('auth.haveAccount')}{' '}
            <a className="authLink" href="/login">
              {t('nav.login')}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
