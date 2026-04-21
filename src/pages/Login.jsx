import './auth.css'
import AuthBrandSide from '../components/auth/AuthBrandSide.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'

export default function Login() {
  const { dir, lang, t } = useI18n()
  return (
    <div className="authPage" dir={dir} lang={lang}>
      <div className="authSplit">
      <AuthBrandSide />
        <div className="authFormPanel">
          <h1 className="authTitle">{t('auth.loginTitle')}</h1>
          <p className="authSubtitle">
            {t('auth.loginSub')}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              window.location.assign('/app')
            }}
            aria-label={t('nav.login')}
          >
            <div className="authField">
              <label className="authLabel" htmlFor="login-email">
                {t('auth.emailOrPhone')}
              </label>
              <input
                className="authInput"
                id="login-email"
                name="email"
                type="text"
                autoComplete="username"
                dir="ltr"
                placeholder={t('auth.emailOrPhonePh')}
              />
            </div>

            <div className="authField">
              <label className="authLabel" htmlFor="login-password">
                {t('auth.password')}
              </label>
              <input
                className="authInput"
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder={t('auth.passwordPh')}
              />
            </div>

            <div className="authRow">
              <label className="authCheck">
                <input type="checkbox" name="remember" />
                {t('auth.rememberMe')}
              </label>
              <a className="authLink" href="#forgot">
                {t('auth.forgotPassword')}
              </a>
            </div>

            <button className="authSubmit" type="submit">
              {t('nav.login')}
            </button>
          </form>

          <p className="authFooterNote">
            {t('auth.noAccount')}{' '}
            <a className="authLink" href="/signup">
              {t('nav.signup')}
            </a>
          </p>
        </div>

       
      </div>
    </div>
  )
}
