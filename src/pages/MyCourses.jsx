import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import './home.css'
import './courses.css'
import './my-courses.css'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { courses as COURSES } from '../data/courses.js'

function progressKey(courseId) {
  return `sah_progress_${courseId}`
}

function loadProgress(courseId) {
  try {
    const raw = localStorage.getItem(progressKey(courseId))
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return {
      completed: parsed?.completed ?? {},
      lastLessonId: parsed?.lastLessonId ?? null,
    }
  } catch {
    return null
  }
}

function pct(done, total) {
  if (!total) return 0
  return Math.max(0, Math.min(100, Math.round((done / total) * 100)))
}

function MyCourseCard({ course, progressPercent, hrefContinue, t, lang }) {
  const title = lang === 'en' ? course.enTitle ?? course.title : course.title
  const shortDesc = lang === 'en' ? course.enShortDesc ?? course.shortDesc : course.shortDesc
  return (
    <a className="mcCardLink" href={hrefContinue} aria-label={title}>
      <article className="course course--page mcCard">
        <div className="course__header">
          <img
            className="course__image"
            src={course.image}
            alt=""
            width="360"
            height="210"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="course__body">
          <h3 className="course__title">{title}</h3>
          <p className="course__desc">{shortDesc}</p>

          <div className="mcProg" aria-label={t('myCourses.progressAria', { p: progressPercent })}>
            <div className="mcProg__bar" role="progressbar" aria-valuenow={progressPercent}>
              <span className="mcProg__fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="mcProg__row">
              <span className="mcProg__pct">{t('myCourses.progressPct', { p: progressPercent })}</span>
              <span className="mcProg__hint">{t('myCourses.tapToContinue')}</span>
            </div>
          </div>

          <div className="course__bottom">
            <span className="course__detailsBtn" aria-hidden="true">
              {t('myCourses.continue')}
            </span>
            <span className="mcDetails" aria-hidden="true">
              {t('coursesPage.details')}
            </span>
          </div>
        </div>
      </article>
    </a>
  )
}

export default function MyCourses() {
  const { dir, lang, t } = useI18n()
  const [items, setItems] = useState([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const next = []
    for (const c of COURSES) {
      const p = loadProgress(c.id)
      if (!p) continue
      const lessons = c.lessons ?? []
      const done = lessons.filter((l) => p.completed?.[l.id]).length
      next.push({
        course: c,
        progressPercent: pct(done, lessons.length),
        hrefContinue: `/course/${c.id}/learn`,
      })
    }
    setItems(next)
  }, [])

  const sorted = useMemo(
    () => [...items].sort((a, b) => (b.progressPercent ?? 0) - (a.progressPercent ?? 0)),
    [items],
  )

  return (
    <div className="app" dir={dir} lang={lang}>
      <Navbar authenticated homePath="/app" />
      <main className="myCoursesPage">
        <section className="myCoursesHero" aria-label={t('nav.myCourses')}>
          <div className="container">
            <header className="myCoursesHero__header">
              <h1 className="myCoursesHero__title">{t('nav.myCourses')}</h1>
              <p className="myCoursesHero__subtitle">{t('myCourses.subtitle')}</p>
            </header>

            {sorted.length ? (
              <section className="coursesGrid coursesGrid--page myCoursesGrid" aria-label={t('nav.myCourses')}>
                {sorted.map((it) => (
                  <MyCourseCard key={it.course.id} {...it} t={t} lang={lang} />
                ))}
              </section>
            ) : (
              <div className="myCoursesEmpty">
                <p className="myCoursesEmpty__title">{t('myCourses.emptyTitle')}</p>
                <p className="myCoursesEmpty__text">{t('myCourses.emptyText')}</p>
                <a className="btn btn--primary" href="/courses">
                  {t('myCourses.browse')}
                </a>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

