import cardHeaderImg from '../../assets/img_home/Card Header.png'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { getCourseById } from '../../data/courses.js'

const COURSES = [
  {
    id: 'p1',
    courseId: 'c1',
    title: 'أساسيات المحاسبة المالية',
    progress: 72,
    image: cardHeaderImg,
  },
  {
    id: 'p2',
    courseId: 'c2',
    title: 'أساسيات المحاسبة المالية',
    progress: 38,
    image: cardHeaderImg,
  },
]

function ProgressCard({ title, progress, image, courseId }) {
  const { t, lang } = useI18n()
  const course = getCourseById(courseId)
  const shownTitle = lang === 'en' ? course.enTitle ?? title : title
  return (
    <article className="continueCard">
      <div className="continueCard__thumbWrap">
        <img className="continueCard__thumb" src={image} alt="" loading="lazy" />
      </div>
      <div className="continueCard__body">
        <h3 className="continueCard__title">{shownTitle}</h3>
        <div
          className="continueCard__progressBar"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span
            className="continueCard__progressFill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="continueCard__percent">{t('homeAfter.completed', { p: progress })}</p>
        <a className="continueCard__btn" href={`/course/${courseId}`}>
          {t('homeAfter.continue')}
        </a>
      </div>
    </article>
  )
}

export default function ContinueLearningSection() {
  const { t } = useI18n()
  return (
    <section className="continueSection" aria-label={t('homeAfter.title')}>
      <div className="container">
        <header className="continueSection__header">
          <h2 className="continueSection__title">{t('homeAfter.title')}</h2>
          <p className="continueSection__subtitle">{t('homeAfter.subtitle')}</p>
        </header>
        <div className="continueGrid">
          {COURSES.map((c) => (
            <ProgressCard key={c.id} {...c} />
          ))}
        </div>
      </div>
    </section>
  )
}
