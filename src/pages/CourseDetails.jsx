import { useMemo, useState } from 'react'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import './home.css'
import './course-details.css'
import { useI18n } from '../i18n/I18nProvider.jsx'

import { getCourseById } from '../data/courses.js'
import clockIcon from '../assets/img_home/tabler_clock-filled.png'
import studentsIcon from '../assets/img_home/mdi_account-student.png'
import featureCert from '../assets/img_home/Group (1).png'

function LevelIcon() {
  return (
    <svg className="cdMeta__svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 19V5m0 14h16M8 16v-6m4 6V7m4 9v-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function useCourseIdFromUrl() {
  const pathname =
    typeof window !== 'undefined' ? window.location.pathname.toLowerCase() : ''
  const parts = pathname.split('/').filter(Boolean)
  // /course/c1
  if (parts[0] === 'course' && parts[1]) return parts[1]
  // /course?id=c1
  const sp =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : null
  const q = sp?.get('id') || sp?.get('course')
  return q || 'c1'
}

function MetaItem({ icon, label, value }) {
  return (
    <span className="cdMeta" aria-label={`${label}: ${value}`}>
      <span className="cdMeta__iconWrap" aria-hidden="true">
        {typeof icon === 'string' ? (
          <img className="cdMeta__icon" src={icon} alt="" width="16" height="16" />
        ) : (
          icon
        )}
      </span>
      <span className="cdMeta__value">{value}</span>
    </span>
  )
}

function AccordionItem({ title, index, open, onToggle }) {
  const { t } = useI18n()
  return (
    <div className="cdAcc">
      <button className="cdAcc__btn" type="button" onClick={onToggle}>
        <span className="cdAcc__right">
          <span className="cdAcc__dot" aria-hidden="true">
            {index + 1}
          </span>
          <span className="cdAcc__title">{title}</span>
        </span>
        <span className="cdAcc__chev" aria-hidden="true">
          {open ? '▾' : '▸'}
        </span>
      </button>
      {open ? (
        <div className="cdAcc__panel">
          <p className="cdAcc__text">{t('courseDetails.unitPlaceholder')}</p>
        </div>
      ) : null}
    </div>
  )
}

export default function CourseDetails() {
  const courseId = useCourseIdFromUrl()
  const course = useMemo(() => getCourseById(courseId), [courseId])
  const [openIdx, setOpenIdx] = useState(0)
  const { dir, lang, t } = useI18n()
  const levelLabel =
    lang === 'en'
      ? course.level === 'مبتدئ'
        ? 'Beginner'
        : course.level === 'متوسط'
          ? 'Intermediate'
          : course.level === 'متقدم'
            ? 'Advanced'
            : course.level
      : course.level

  const curriculumList =
    lang === 'en' ? course.enCurriculum ?? course.curriculum : course.curriculum
  const audienceList = lang === 'en' ? course.enAudience ?? course.audience : course.audience

  return (
    <div className="app" dir={dir} lang={lang}>
      <Navbar />

      <main className="courseDetailsPage">
        <section className="cdHero" aria-label={t('courseDetails.details')}>
          <div className="container cdHero__inner">
            <div className="cdHero__media" aria-hidden="true">
              <div className="cdHero__frame" />
              <div className="cdHero__imgWrap">
                <img className="cdHero__img" src={course.image} alt="" />
              </div>
            </div>

            <div className="cdHero__content">
              <h1 className="cdHero__title">{lang === 'en' ? course.enTitle ?? course.title : course.title}</h1>
              <p className="cdHero__subtitle">
                {lang === 'en' ? course.enLongDesc ?? course.longDesc : course.longDesc}
              </p>

              <div className="cdHero__meta" aria-label={t('courseDetails.meta')}>
                <MetaItem icon={clockIcon} label={t('courseDetails.duration')} value={course.duration} />
                <MetaItem
                  icon={studentsIcon}
                  label={t('courseDetails.students')}
                  value={`${course.students}+`}
                />
                <MetaItem icon={<LevelIcon />} label={t('courseDetails.level')} value={levelLabel ?? (lang === 'en' ? 'Beginner' : 'مبتدئ')} />
              </div>

              <div className="cdHero__priceRow">
                <p
                  className="cdHero__price"
                  aria-label={t('courseDetails.priceAria', { price: course.price })}
                >
                  <span className="cdHero__priceValue">{course.price.replace(/[^\d]/g, '')}</span>
                  <span className="cdHero__priceCurrency">{lang === 'en' ? 'SAR' : 'ر.س'}</span>
                </p>
                <button
                  className="cdHero__buy"
                  type="button"
                  onClick={() => window.location.assign(`/course/${courseId}/learn`)}
                >
                  {t('courseDetails.buyNow')}
                </button>
              </div>
              <p className="cdHero__note">{t('courseDetails.oneTime')}</p>
            </div>
          </div>
        </section>

        <section className="cdCert" aria-label={t('courseDetails.certTitle')}>
          <div className="container cdCert__inner">
            <div className="cdCert__iconWrap" aria-hidden="true">
              <img className="cdCert__icon" src={featureCert} alt="" />
            </div>
            <div>
              <h2 className="cdCert__title">{t('courseDetails.certTitle')}</h2>
              <p className="cdCert__text">{t('courseDetails.certText')}</p>
            </div>
          </div>
        </section>

        <section className="cdCurr" aria-label={t('courseDetails.curriculumTitle')}>
          <div className="container">
            <div className="cdCurr__panel">
              <h2 className="cdCurr__title">{t('courseDetails.curriculumTitle')}</h2>
              <div className="cdCurr__list">
                {curriculumList.map((t, idx) => (
                  <AccordionItem
                    key={t}
                    title={t}
                    index={idx}
                    open={openIdx === idx}
                    onToggle={() => setOpenIdx((v) => (v === idx ? -1 : idx))}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="cdAudience" aria-label={t('courseDetails.audienceTitle')}>
          <div className="container">
            <div className="cdAudience__panel">
              <div className="cdAudience__illus" aria-hidden="true" />
              <div className="cdAudience__content">
                <h2 className="cdAudience__title">{t('courseDetails.audienceTitle')}</h2>
                <ul className="cdAudience__list" role="list">
                  {audienceList.map((a) => (
                    <li key={a} className="cdAudience__item">
                      <span className="cdAudience__check" aria-hidden="true">
                        ✓
                      </span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

