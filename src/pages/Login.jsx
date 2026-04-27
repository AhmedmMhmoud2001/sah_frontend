import { useState } from 'react'
import './auth.css'
import AuthBrandSide from '../components/auth/AuthBrandSide.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'
<<<<<<< Updated upstream
import { useState } from 'react'
import { login as apiLogin } from '../api/index.js'

export default function Login() {
  const { dir, lang, t } = useI18n()
  const [loading, setLoading] = useState(false)
=======
import { loginUser } from '../lib/auth.js'

export default function Login() {
  const { dir, lang, t } = useI18n()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMessage('')

    const formData = new FormData(e.currentTarget)
    const email = String(formData.get('email') || '').trim()
    const password = String(formData.get('password') || '')

    if (!email || !password) {
      setErrorMessage('Please enter email and password.')
      return
    }

    try {
      setIsSubmitting(true)
      await loginUser({ email, password })
      window.location.assign('/app')
    } catch (error) {
      setErrorMessage(error?.message || 'Failed to login.')
    } finally {
      setIsSubmitting(false)
    }
  }

>>>>>>> Stashed changes
  return (
    <div className="authPage" dir={dir} lang={lang}>
      <div className="authSplit">
      <AuthBrandSide />
        <div className="authFormPanel">
          <h1 className="authTitle">{t('auth.loginTitle')}</h1>
          <p className="authSubtitle">
            {t('auth.loginSub')}
          </p>

<<<<<<< Updated upstream
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              if (loading) return
              const form = new FormData(e.currentTarget)
              const email = String(form.get('email') || '').trim()
              const password = String(form.get('password') || '').trim()
              setLoading(true)
              try {
                await apiLogin({ email, password })
                window.location.assign('/')
              } catch (err) {
                console.error(err)
                alert(lang === 'en' ? 'Login failed' : 'فشل تسجيل الدخول')
              } finally {
                setLoading(false)
              }
            }}
            aria-label={t('nav.login')}
          >
=======
          <form onSubmit={handleSubmit} aria-label={t('nav.login')}>
>>>>>>> Stashed changes
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
                required
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
                required
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

<<<<<<< Updated upstream
            <button className="authSubmit" type="submit" disabled={loading}>
              {loading ? (lang === 'en' ? 'Signing in...' : 'جاري تسجيل الدخول...') : t('nav.login')}
=======
            {errorMessage ? <p className="authMessage authMessage--error">{errorMessage}</p> : null}
            <button className="authSubmit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : t('nav.login')}
>>>>>>> Stashed changes
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
