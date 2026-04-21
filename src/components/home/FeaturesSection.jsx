import groupImg from '../../assets/img_home/Group.png'
import groupAltImg from '../../assets/img_home/Group (1).png'
import objectImg from '../../assets/img_home/Object.png'
import objectAltImg from '../../assets/img_home/Object (1).png'
import { useI18n } from '../../i18n/I18nProvider.jsx'

const FEATURES_AR = [
  {
    title: 'تعلم بالذكاء الاصطناعي',
    desc: 'مساعدة ذكية لتسريع التعلم والإجابة عن أسئلتك.',
    icon: groupImg,
  },
  {
    title: 'تدريب متخصص في Odoo',
    desc: 'محتوى عملي يركز على تطبيقات Odoo في الأعمال.',
    icon: objectImg,
  },
  {
    title: 'مدربون متخصصون',
    desc: 'تعلم مع مدربين بخبرة عملية طويلة في المجال.',
    icon: objectAltImg,
  },
  {
    title: 'شهادة إتمام معتمدة',
    desc: 'احصل على شهادة بعد إكمال الدورة واجتياز التقييم.',
    icon: groupAltImg,
  },
]

const FEATURES_EN = [
  {
    title: 'AI-powered learning',
    desc: 'Smart help to accelerate learning and answer your questions.',
    icon: groupImg,
  },
  {
    title: 'Specialized Odoo training',
    desc: 'Practical content focused on real Odoo business applications.',
    icon: objectImg,
  },
  {
    title: 'Expert instructors',
    desc: 'Learn with instructors who have deep hands-on experience.',
    icon: objectAltImg,
  },
  {
    title: 'Certified completion',
    desc: 'Get a certificate after completing the course and passing the evaluation.',
    icon: groupAltImg,
  },
]

function FeatureCard({ icon, title, desc }) {
  return (
    <li className="feature" role="listitem">
      <img
        className="feature__icon"
        src={icon}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <h3 className="feature__title">{title}</h3>
      {/* keep description for semantics/accessibility without the card look */}
      <p className="feature__desc feature__desc--subtle">{desc}</p>
    </li>
  )
}

export default function FeaturesSection() {
  const { lang } = useI18n()
  const items = lang === 'en' ? FEATURES_EN : FEATURES_AR
  return (
    <section className="section" aria-label={lang === 'en' ? 'Features' : 'المميزات'}>
      <div className="container">
        <ul className="featuresGrid" role="list">
          {items.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </ul>
      </div>
    </section>
  )
}

