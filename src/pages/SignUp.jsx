import { useState } from 'react'
import './auth.css'
import AuthBrandSide from '../components/auth/AuthBrandSide.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'
<<<<<<< Updated upstream
import { useState } from 'react'
import { register as apiRegister } from '../api/index.js'

export default function SignUp() {
  const { dir, lang, t } = useI18n()
  const [loading, setLoading] = useState(false)
=======
import { registerUser } from '../lib/auth.js'

export default function SignUp() {
  const { dir, lang, t } = useI18n()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    const formData = new FormData(e.currentTarget)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const password = String(formData.get('password') || '')
    const passwordConfirm = String(formData.get('passwordConfirm') || '')

    if (!name || !email || !password || !passwordConfirm) {
      setErrorMessage('Please fill all required fields.')
      return
    }

    if (password !== passwordConfirm) {
      setErrorMessage('Passwords do not match.')
      return
    }

    try {
      setIsSubmitting(true)
      await registerUser({ name, email, password })

      setSuccessMessage('Account created successfully. Redirecting...')
      setTimeout(() => {
        window.location.assign('/app')
      }, 700)
    } catch (error) {
      setErrorMessage(error?.message || 'Something went wrong. Please try again.')
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
          <h1 className="authTitle">{t('auth.signupTitle')}</h1>
          <p className="authSubtitle">
            {t('auth.signupSub')}
          </p>

<<<<<<< Updated upstream
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              if (loading) return
              const form = new FormData(e.currentTarget)
              const name = String(form.get('name') || '').trim()
              const email = String(form.get('email') || '').trim()
              const password = String(form.get('password') || '').trim()
              setLoading(true)
              try {
                await apiRegister({ name, email, phone: null, password })
                window.location.assign('/')
              } catch (err) {
                console.error(err)
                alert(lang === 'en' ? 'Sign up failed' : 'فشل إنشاء الحساب')
              } finally {
                setLoading(false)
              }
            }}
            aria-label={t('nav.signup')}
          >
=======
          <form onSubmit={handleSubmit} aria-label={t('nav.signup')}>
>>>>>>> Stashed changes
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
                required
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
                required
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
                minLength={6}
                required
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
                minLength={6}
                required
              />
            </div>

            <div className="authRow" style={{ marginBottom: 18 }}>
              <label className="authCheck">
                <input type="checkbox" name="terms" required />
                {t('auth.agreeTerms')}
              </label>
            </div>

<<<<<<< Updated upstream
            <button className="authSubmit" type="submit" disabled={loading}>
              {loading ? (lang === 'en' ? 'Creating account...' : 'جاري إنشاء الحساب...') : t('nav.signup')}
=======
            {errorMessage ? <p className="authMessage authMessage--error">{errorMessage}</p> : null}
            {successMessage ? <p className="authMessage authMessage--success">{successMessage}</p> : null}

            <button className="authSubmit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : t('nav.signup')}
>>>>>>> Stashed changes
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
