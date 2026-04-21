import { useI18n } from '../../i18n/I18nProvider.jsx'

const STEPS = [
  {
    number: '01',
    title: 'اختر الدورة',
    desc: 'اختر الدورة المناسبة لمستواك وهدفك المهني.',
  },
  {
    number: '02',
    title: 'ابدأ التعلم',
    desc: 'تابع الدروس وطبّق عملياً مع تمارين ومهام.',
  },
  {
    number: '03',
    title: 'احصل على الشهادة',
    desc: 'أكمل التقييم لتحصل على شهادة إتمام معتمدة.',
  },
]

function Step({ number, title, desc }) {
  return (
    <li className="step">
      <div className="step__badge" aria-hidden="true">
        {number}
      </div>
      <h3 className="step__title">{title}</h3>
      <p className="step__desc">{desc}</p>
    </li>
  )
}

export default function StepsSection() {
  const { t, lang } = useI18n()
  const steps = [
    {
      number: '01',
      title: lang === 'en' ? 'Choose a course' : 'اختر الدورة',
      desc:
        lang === 'en'
          ? 'Pick the right course for your level and goal.'
          : 'اختر الدورة المناسبة لمستواك وهدفك المهني.',
    },
    {
      number: '02',
      title: lang === 'en' ? 'Start learning' : 'ابدأ التعلم',
      desc:
        lang === 'en'
          ? 'Watch lessons and practice with tasks.'
          : 'تابع الدروس وطبّق عملياً مع تمارين ومهام.',
    },
    {
      number: '03',
      title: lang === 'en' ? 'Get certified' : 'احصل على الشهادة',
      desc:
        lang === 'en'
          ? 'Complete the evaluation to earn a certificate.'
          : 'أكمل التقييم لتحصل على شهادة إتمام معتمدة.',
    },
  ]
  return (
    <section className="section" aria-label={t('home.stepsTitle')}>
      <div className="container">
        <header className="section__header">
          <h2 className="section__title">{t('home.stepsTitle')}</h2>
          <p className="section__subtitle">
            {t('home.stepsSub')}
          </p>
        </header>

        <ol className="steps" role="list">
          {steps.map((s) => (
            <Step key={s.number} {...s} />
          ))}
        </ol>
      </div>
    </section>
  )
}

