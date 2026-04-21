import { useMemo, useState } from 'react'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import './home.css'
import './learn.css'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { toastSuccess } from '../ui/toast.js'

import { getCourseById } from '../data/courses.js'

function parseQuizRoute() {
  const pathname =
    typeof window !== 'undefined' ? window.location.pathname.toLowerCase() : ''
  const parts = pathname.split('/').filter(Boolean)
  // /course/:id/quiz/:lessonId
  if (parts[0] === 'course' && parts[1] && parts[2] === 'quiz' && parts[3]) {
    return { courseId: parts[1], type: 'lesson', lessonId: parts[3] }
  }
  // /course/:id/final-quiz
  if (parts[0] === 'course' && parts[1] && parts[2] === 'final-quiz') {
    return { courseId: parts[1], type: 'final', lessonId: null }
  }
  return { courseId: 'c1', type: 'final', lessonId: null }
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

export default function Quiz() {
  const { dir, lang, t } = useI18n()
  const route = parseQuizRoute()
  const course = useMemo(() => getCourseById(route.courseId), [route.courseId])

  const quiz = useMemo(() => {
    if (route.type === 'final') return course.finalQuiz ?? null
    const lesson = (course.lessons ?? []).find((l) => l.id === route.lessonId)
    return lesson?.quiz ?? null
  }, [course, route.type, route.lessonId])

  const quizTitle =
    lang === 'en' ? quiz?.enTitle ?? quiz?.title ?? 'Quiz' : quiz?.title ?? 'اختبار'
  const courseTitle = lang === 'en' ? course.enTitle ?? course.title : course.title

  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const score = useMemo(() => {
    if (!quiz?.questions?.length) return 0
    return quiz.questions.reduce((acc, q, idx) => {
      const a = answers[idx]
      return acc + (a === q.correctIndex ? 1 : 0)
    }, 0)
  }, [quiz, answers])

  function onSubmit(e) {
    e.preventDefault()
    setSubmitted(true)

    const p = loadProgress(route.courseId)
    const key = route.type === 'final' ? 'final' : `lesson:${route.lessonId}`
    const next = {
      ...p,
      quizScores: {
        ...(p.quizScores ?? {}),
        [key]: { score, total: quiz?.questions?.length ?? 0, at: Date.now() },
      },
    }
    saveProgress(route.courseId, next)
    toastSuccess(t('toast.quizSaved', { score, total: quiz?.questions?.length ?? 0 }))
  }

  const backHref =
    route.type === 'final'
      ? `/course/${route.courseId}/learn`
      : `/course/${route.courseId}/learn`

  return (
    <div className="app" dir={dir} lang={lang}>
      <Navbar />

      <main className="quizPage">
        <section className="quizShell" aria-label={quizTitle}>
          <div className="container">
            <div className="quizTop">
              <div>
                <h1 className="quizTitle">{quizTitle}</h1>
                <p className="quizSubtitle">{courseTitle}</p>
              </div>
              <a className="learnBtn learnBtn--ghost" href={backHref}>
                  {t('learn.backToCourse')}
              </a>
            </div>

            {!quiz?.questions?.length ? (
                <div className="quizEmpty">{t('learn.noQuestions')}</div>
            ) : (
              <form className="quizForm" onSubmit={onSubmit}>
                {quiz.questions.map((q, idx) => {
                  const selected = answers[idx]
                  const isCorrect = submitted && selected === q.correctIndex
                  const isWrong = submitted && selected != null && selected !== q.correctIndex
                  return (
                    <fieldset
                      key={idx}
                      className={
                        isCorrect
                          ? 'quizQ quizQ--ok'
                          : isWrong
                            ? 'quizQ quizQ--bad'
                            : 'quizQ'
                      }
                    >
                      <legend className="quizQ__title">
                        {idx + 1}. {lang === 'en' ? q.textEn ?? q.text : q.text}
                      </legend>
                      <div
                        className="quizOptions"
                        role="radiogroup"
                        aria-label={lang === 'en' ? q.textEn ?? q.text : q.text}
                      >
                        {(lang === 'en' ? q.optionsEn ?? q.options : q.options).map((opt, oi) => (
                          <label key={oi} className="quizOpt">
                            <input
                              type="radio"
                              name={`q_${idx}`}
                              checked={selected === oi}
                              disabled={submitted}
                              onChange={() =>
                                setAnswers((prev) => ({ ...prev, [idx]: oi }))
                              }
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  )
                })}

                <div className="quizActions">
                  <button className="learnBtn learnBtn--primary" type="submit" disabled={submitted}>
                    {t('learn.finishQuiz')}
                  </button>
                  {submitted ? (
                    <p className="quizScore">
                      {t('learn.score', { score, total: quiz.questions.length })}
                    </p>
                  ) : null}
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

