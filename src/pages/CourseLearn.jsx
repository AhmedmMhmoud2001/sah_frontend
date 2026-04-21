import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import './home.css'
import './learn.css'
import { useI18n } from '../i18n/I18nProvider.jsx'

import { getCourseById } from '../data/courses.js'

function useCourseIdFromUrl() {
  const pathname =
    typeof window !== 'undefined' ? window.location.pathname.toLowerCase() : ''
  const parts = pathname.split('/').filter(Boolean)
  // /course/:id/learn
  if (parts[0] === 'course' && parts[1]) return parts[1]
  return 'c1'
}

function progressKey(courseId) {
  return `sah_progress_${courseId}`
}

function loadProgress(courseId) {
  try {
    const raw = localStorage.getItem(progressKey(courseId))
    if (!raw) return { completed: {}, lastLessonId: null, quizScores: {} }
    const parsed = JSON.parse(raw)
    return {
      completed: parsed?.completed ?? {},
      lastLessonId: parsed?.lastLessonId ?? null,
      quizScores: parsed?.quizScores ?? {},
    }
  } catch {
    return { completed: {}, lastLessonId: null, quizScores: {} }
  }
}

function saveProgress(courseId, progress) {
  localStorage.setItem(progressKey(courseId), JSON.stringify(progress))
}

function YouTubeFrame({ url, title }) {
  return (
    <iframe
      className="learnPlayer__iframe"
      src={url}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  )
}

export default function CourseLearn() {
  const { dir, lang, t } = useI18n()
  const courseId = useCourseIdFromUrl()
  const course = useMemo(() => getCourseById(courseId), [courseId])
  const lessons = course.lessons ?? []
  const courseTitle = lang === 'en' ? course.enTitle ?? course.title : course.title

  const [progress, setProgress] = useState(() => loadProgress(courseId))
  const [activeLessonId, setActiveLessonId] = useState(() => {
    const p = loadProgress(courseId)
    return p.lastLessonId ?? lessons[0]?.id ?? null
  })

  useEffect(() => {
    const p = loadProgress(courseId)
    setProgress(p)
    setActiveLessonId(p.lastLessonId ?? lessons[0]?.id ?? null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId])

  const activeLesson = useMemo(
    () => lessons.find((l) => l.id === activeLessonId) ?? lessons[0],
    [lessons, activeLessonId],
  )

  function setCompleted(lessonId, value) {
    setProgress((prev) => {
      const next = {
        ...prev,
        completed: { ...(prev.completed ?? {}), [lessonId]: value },
      }
      saveProgress(courseId, next)
      return next
    })
  }

  function setActive(lessonId) {
    setActiveLessonId(lessonId)
    setProgress((prev) => {
      const next = { ...prev, lastLessonId: lessonId }
      saveProgress(courseId, next)
      return next
    })
  }

  const completedCount = lessons.filter((l) => progress.completed?.[l.id]).length

  return (
    <div className="app" dir={dir} lang={lang}>
      <Navbar />

      <main className="learnPage">
        <section className="learnHero" aria-label={t('learn.player')}>
          <div className="container learnHero__inner">
            <header className="learnHero__header">
              <h1 className="learnHero__title">{courseTitle}</h1>
              <p className="learnHero__subtitle">
                {t('learn.completed', { done: completedCount, total: lessons.length || 0 })}
              </p>
            </header>

            <div className="learnLayout">
              <section className="learnPlayer" aria-label={t('learn.videoArea')}>
                <div className="learnPlayer__frame">
                  {activeLesson?.type === 'youtube' && activeLesson?.videoUrl ? (
                    <YouTubeFrame url={activeLesson.videoUrl} title={activeLesson.title} />
                  ) : (
                    <div className="learnPlayer__empty">{t('learn.noVideo', {})}</div>
                  )}
                </div>

                <div className="learnPlayer__meta">
                  <h2 className="learnPlayer__title">
                    {lang === 'en'
                      ? activeLesson?.enTitle ?? activeLesson?.title ?? '—'
                      : activeLesson?.title ?? '—'}
                  </h2>
                  <div className="learnPlayer__actions">
                    {activeLesson?.quiz ? (
                      <a
                        className="learnBtn learnBtn--ghost"
                        href={`/course/${courseId}/quiz/${activeLesson.id}`}
                      >
                        {t('learn.quiz')}
                      </a>
                    ) : (
                      <span className="learnHint">{t('learn.noQuiz')}</span>
                    )}
                    <label className="learnCheck">
                      <input
                        type="checkbox"
                        checked={!!progress.completed?.[activeLesson?.id]}
                        onChange={(e) => setCompleted(activeLesson.id, e.target.checked)}
                      />
                      <span>{t('learn.finishVideo')}</span>
                    </label>
                  </div>
                </div>
              </section>

              <aside className="learnList" aria-label={t('learn.videosList')}>
                <div className="learnList__header">
                  <h2 className="learnList__title">{t('learn.videos')}</h2>
                  <a className="learnBtn learnBtn--primary" href={`/course/${courseId}/final-quiz`}>
                    {t('learn.finalQuiz')}
                  </a>
                </div>

                <ol className="learnItems" role="list">
                  {lessons.map((l, idx) => {
                    const done = !!progress.completed?.[l.id]
                    const active = l.id === activeLesson?.id
                    return (
                      <li
                        key={l.id}
                        className={active ? 'learnItem learnItem--active' : 'learnItem'}
                      >
                        <button
                          type="button"
                          className="learnItem__main"
                          onClick={() => setActive(l.id)}
                        >
                          <span className="learnItem__index" aria-hidden="true">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="learnItem__text">
                            <span className="learnItem__title">
                              {lang === 'en' ? l.enTitle ?? l.title : l.title}
                            </span>
                            <span className="learnItem__sub">
                              <span className="learnItem__time">{l.duration ?? '—'}</span>
                              {l.quiz ? (
                                <a
                                  className="learnItem__quiz"
                                  href={`/course/${courseId}/quiz/${l.id}`}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {t('learn.quiz')}
                                </a>
                              ) : null}
                            </span>
                          </span>
                        </button>

                        <label
                          className="learnItem__check"
                          aria-label={t('learn.markCompleted')}
                        >
                          <input
                            type="checkbox"
                            checked={done}
                            onChange={(e) => setCompleted(l.id, e.target.checked)}
                          />
                        </label>
                      </li>
                    )
                  })}
                </ol>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

